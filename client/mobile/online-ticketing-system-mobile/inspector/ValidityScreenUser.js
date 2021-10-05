import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';

import {
  ButtonGroup,
  VStack,
  Heading,
  Center,
  Box,
  Spinner,
  Text,
  Pressable,
} from 'native-base';

import { Platform } from 'react-native';

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

Geocoder.init('AIzaSyBJ6etA3VFhb6LPKJ30iQj1Mf30o-OV4Ow');

const ValidityScreenUser = ({ route, navigation }) => {
  const { id, creditAmount, accountId, email, passportNo, address, name, nic } =
    route.params;

  const [validity, setValidity] = useState('');
  const [location, setLocation] = useState(null);
  const [account, setAccount] = useState('');
  const [fine, setFine] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    getLocation();
    getData();
  }, []);

  useEffect(() => {
    if (location) {
      apiCall();
    }
  }, [location]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('account');

      setAccount(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  };

  const apiCall = async () => {
    const data = {
      currentLocationLat: location.coords.latitude,
      currentLocationLong: location.coords.longitude,
      passengerId: accountId,
      InspectorId: account.id,
    };

    const res = await axios.post(
      'http://localhost/api/v1/ticket/valid-account',
      data,
      config
    );
    setValidity(res.data.data.status);
    setFine(res.data.data.fine)
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };
  return (
    <VStack alignItems='center' space='4' mt='5'>
      <Center
        w={{
          base: '90%',
          md: '25%',
        }}
        bg={
          validity === 'Invalid'
            ? '#b91c1c'
            : validity === 'Valid'
            ? '#34d399'
            : '#fef2f2'
        }
        rounded='md'
        shadow={3}>
        {' '}
        {validity !== '' ? (
          <Text fontSize='lg'>
            {validity === 'Invalid' ? 'Invalid Ticket' : 'Valid Ticket'}
          </Text>
        ) : (
          <Spinner accessibilityLabel='Loading posts' />
        )}{' '}
      </Center>

      <Box
        w={{
          base: '90%',
          md: '25%',
        }}
        bg={'white'}
        rounded={'lg'}
        paddingTop={'10'}
        paddingLeft='5'
        paddingRight='5'
        paddingBottom='10'>
        <Text fontSize='lg'>Name:</Text>
        <Text fontSize='lg' mb='3'>
          {name}
        </Text>
        <Text fontSize='lg'>Address:</Text>
        <Text fontSize='lg' mb='3'>
          {address}
        </Text>
        <Text fontSize='lg'>Credit Amount:</Text>
        <Text fontSize='lg' mb='3'>
          {creditAmount}
        </Text>

        <Text fontSize='lg'>Fine:</Text>
        <Text fontSize='lg' mb='3'>
          {fine}
        </Text>
      </Box>
    </VStack>
  );
};

export default ValidityScreenUser;

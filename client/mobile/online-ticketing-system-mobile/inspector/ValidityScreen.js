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

const ValidityScreen = ({ route, navigation }) => {
  const {
    id,
    ticketTypeId,
    price,
    destinationLat,
    destinationLong,
    issuedLocationLat,
    issuedLocationLong,
    validityPeriod,
  } = route.params;

  const [validity, setValidity] = useState('');
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [account, setAccount] = useState('');
  const [fine, setFine] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    getLocation();
    Geocoder.from(destinationLat, destinationLong)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
        setDestination(addressComponent);
      })
      .catch((error) => console.warn(error));

    Geocoder.from(issuedLocationLat, issuedLocationLong)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
        setStartLocation(addressComponent);
      })
      .catch((error) => console.warn(error));
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
      ticketId: id,
      currentLocationLat: location.coords.latitude,
      currentLocationLong: location.coords.longitude,
      InspectorId: account.id,
    };

    const res = await axios.post(
      'http://localhost/api/v1/ticket/valid-ticket',
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
        <Text fontSize='lg'>Ticket No:</Text>
        <Text fontSize='lg' mb='3'>
          {id}
        </Text>
        <Text fontSize='lg'>Category:</Text>
        <Text fontSize='lg' mb='3'>
          {ticketTypeId === 1
            ? 'One Way Ticket'
            : ticketTypeId === 2
            ? 'Day Use Ticket'
            : 'Pay As You Go Ticket'}
        </Text>
        <Text fontSize='lg'>Amount:</Text>
        <Text fontSize='lg' mb='3'>
          {price}
        </Text>
        <Text fontSize='lg'>Destination:</Text>
        <Text fontSize='lg' mb='3'>
          {destination}
        </Text>
        <Text fontSize='lg'>Started Location:</Text>
        <Text fontSize='lg' mb='3'>
          {startLocation}
        </Text>
        <Text fontSize='lg'>Valid Till:</Text>
        <Text fontSize='lg' mb='3'>
          {validityPeriod.split('T')[0]}
        </Text>
        <Text fontSize='lg'>Fine:</Text>
        <Text fontSize='lg' mb='3'>
          {fine}
        </Text>
      </Box>
    </VStack>
  );
};

export default ValidityScreen;

import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  VStack,
  Heading,
  Center,
  Pressable,
  Text,
  Box,
  Image,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const InspectorDashboard = ({ navigation }) => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    getData();
    getLocation();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('account');
      setAccount(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(
      '🚀 ~ file: ValidityScreen.js ~ line 114 ~ getLocation ~ location',
      location
    );

    apiCall(location);
  };
  return (
    <>
      <VStack space={4} alignItems='center'>
        <Heading textAlign='center' mb='10'></Heading>
        <Pressable
          onPress={() => {
            navigation.navigate('Scan Ticket', account);
          }}
          _web={{
            cursor: 'pointer',
          }}>
          <Center
            w='64'
            height={'180'}
            bg='primary.500'
            rounded='md'
            shadow={3}>
            {' '}
            <Box>
              {' '}
              <Text
                _dark={{
                  color: 'primary.50',
                }}
                color='primary.50'
                fontSize='lg'
                mt='2'>
                Scan Tickets
              </Text>{' '}
            </Box>
          </Center>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('Scan User', account);
          }}
          _web={{
            cursor: 'pointer',
          }}>
          <Center
            w='64'
            height={'180'}
            bg='primary.500'
            rounded='md'
            shadow={3}>
            {' '}
            <Text
              _dark={{
                color: 'primary.50',
              }}
              color='primary.50'
              fontSize='lg'>
              Scan Users
            </Text>{' '}
          </Center>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Inspector Details', account);
          }}
          _web={{
            cursor: 'pointer',
          }}>
          <Center
            w='64'
            height={'180'}
            bg='primary.500'
            rounded='md'
            shadow={3}>
            {' '}
            <Text
              _dark={{
                color: 'primary.50',
              }}
              color='primary.50'
              fontSize='lg'>
              View Inspection Details
            </Text>{' '}
          </Center>
        </Pressable>
      </VStack>
    </>
  );
};

export default InspectorDashboard;

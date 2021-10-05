import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Box,
  Center,
  Button,
  ScrollView,
  Text,
  NativeBaseProvider,
  Avatar,
} from 'native-base';
import { StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountDetails = () => {
  const [account, setAccount] = useState('');
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('account');

      setAccount(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  };
  return (
    <Center>
      <Image
        mt='5'
        style={{ width: 300, height: 300 }}
        source={{
          uri: `${account.qrCode}`,
        }}
      />
      <Text
        mt='5'
        fontSize='lg'
        _dark={{
          color: 'warmGray.50',
        }}
        color='coolGray.800'>
        {account.email}
      </Text>
      <Text
        fontSize='lg'
        _dark={{
          color: 'warmGray.50',
        }}
        color='coolGray.800'>
        {account && account.passenger.name}
      </Text>
      <Text
        fontSize='lg'
        _dark={{
          color: 'warmGray.50',
        }}
        color='coolGray.800'>
        {account && account.passenger.address}
      </Text>
      <Text
        fontSize='lg'
        _dark={{
          color: 'warmGray.50',
        }}
        color='coolGray.800'>
        {account && account.passenger.nic}
      </Text>
      <Text
        fontSize='lg'
        _dark={{
          color: 'warmGray.50',
        }}
        color='coolGray.800'>
        {account && account.passenger.passportNo}
      </Text>
    </Center>
  );
};

export default AccountDetails;

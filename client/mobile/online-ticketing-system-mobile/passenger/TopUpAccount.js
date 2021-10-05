import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Box,
  Heading,
  Center,
  Button,
  NativeBaseProvider,
} from 'native-base';
import { StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const TopUpAccount = ({ navigation }) => {
  const [data, setData] = useState({
    amount: '',
    cvc: '',
    name: '',
    cardNumber: '',
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.placeholder]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const res = await axios.post(
        'https://localhost/api/v1/account/payment',
        data,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const storeData = async (value) => {
    try {
      console.log(value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('account', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  return (
    <Center style={styles.center}>
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
        <Stack mx='4'>
          <Heading mb='5'>Enter credit Debit</Heading>
          <FormControl.Label>Card Number</FormControl.Label>
          <Input
            type='text'
            name='cardNumber'
            id={'cardNumber'}
            placeholder='card'
            onChange={onChange}
          />
          <FormControl.Label mt={4}>Enter CVC Number</FormControl.Label>
          <Input
            name='cvc'
            type='text'
            id={'cvc'}
            placeholder='cvc'
            onChange={onChange}
          />

          <FormControl.Label mt={4}>Card Holders Name</FormControl.Label>
          <Input
            name='name'
            type='text'
            id={'name'}
            placeholder='name'
            onChange={onChange}
          />

          <FormControl.Label mt={4}>Enter TopUp Amount</FormControl.Label>
          <Input
            name='amount'
            type='number'
            id={'amount'}
            placeholder='amount'
            onChange={onChange}
          />

          <Button mt={6} onPress={onSubmit}>
            TopUp
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  center: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default TopUpAccount;

import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Box,
  Text,
  Center,
  Pressable,
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

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.placeholder]: e.target.value });
  };

  const onSubmit = async () => {
    storeData({
      id: 37,
      creditAmount: 100,
      email: 'pasinduj9@gmail.com',
      qrCode:
        'data:image/png;base64,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',
      passenger: {
        id: 49,
        name: 'pasindu',
        nic: '971422323V',
        address: 'ja-ela, Makewita',
        passportNo: '12121212',
      },
    });
    navigation.navigate('Inspector Dashboard');
    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        'https://localhost:5000/api/v1/auth/login',
        data,
        config
      );

      // storeData(res.data.data);

      if (res.data.data.accountTypeId === 1) {
        navigation.navigate('Passenger Dashboard');
      } else if (res.data.data.accountTypeId === 2) {
        navigation.navigate('Inspector Dashboard');
      }
    } catch (error) {}
  };

  const storeData = async (value) => {
    try {
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
          <FormControl.Label>Email</FormControl.Label>
          <Input
            type='text'
            name='email'
            id={'email'}
            placeholder='email'
            onChange={onChange}
          />
          <FormControl.Label mt={4}>Password</FormControl.Label>
          <Input
            name='password'
            type='password'
            id={'password'}
            placeholder='password'
            onChange={onChange}
          />

          <Button mt={6} onPress={onSubmit}>
            Login
          </Button>
          <Pressable
            mt='4'
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text>Register account</Text>
          </Pressable>
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

export default Login;

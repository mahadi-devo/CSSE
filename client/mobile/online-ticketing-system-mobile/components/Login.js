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
  useToast,
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
  // const [data, setData] = useState({
  //   email: '',
  //   password: '',
  // });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();

  // const { email, password } = data;

  const onChange = (e) => {
    e.target.value;
    setData({ ...data, [e.target.placeholder]: e.target.value });
  };

  const onSubmit = async () => {
    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        'http://192.168.1.4:5000/api/v1/auth/login',
        data,
        config
      );

      storeData(res.data.data);

      toast.show({ description: 'Login successfull' });

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
            onChangeText={setEmail}
          />
          <FormControl.Label mt={4}>Password</FormControl.Label>
          <Input
            name='password'
            type='password'
            id={'password'}
            placeholder='password'
            onChangeText={setPassword}
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

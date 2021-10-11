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
  useToast,
  NativeBaseProvider,
} from 'native-base';
import { StyleSheet, Image } from 'react-native';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const Register = ({ navigation }) => {
  const [data, setData] = useState({
    creditAmount: 100,
    name: '',
    nic: '',
    address: '',
    passportNo: null,
    password: '',
    email: '',
  });

  const toast = useToast();

  const onChange = (e) => {
    setData({ ...data, [e.target.placeholder]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/account',
        data,
        config
      );
      toast.show({
        description: 'Registered Successfully',
      });

      navigation.navigate('Login');
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
          <Heading mb='5'>Enter Details</Heading>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            type='text'
            id={'name'}
            placeholder='name'
            onChange={onChange}
          />
          <FormControl.Label mt={4}>Email</FormControl.Label>
          <Input
            type='email'
            id={'email'}
            placeholder='email'
            onChange={onChange}
          />

          <FormControl.Label mt={4}>NIC</FormControl.Label>
          <Input type='text' id={'nic'} placeholder='nic' onChange={onChange} />

          <FormControl.Label mt={4}>Address</FormControl.Label>
          <Input
            type='text'
            id={'address'}
            placeholder='address'
            onChange={onChange}
          />

          <FormControl.Label mt={4}>PassportNo</FormControl.Label>
          <Input
            type='number'
            id={'passportNo'}
            placeholder='passportNo'
            onChange={onChange}
          />

          <FormControl.Label mt={4}>Password</FormControl.Label>
          <Input
            type='text'
            id={'password'}
            placeholder='password'
            onChange={onChange}
          />

          <Button mt={6} onPress={onSubmit}>
            Register
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

export default Register;

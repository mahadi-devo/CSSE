import React, { useState, useEffect } from 'react';
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

const AvailableCredit = ({ navigation }) => {
  const [amount, setAmount] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('account');
      setAmount(JSON.parse(jsonValue).creditAmount);
    } catch (e) {
      // error reading value
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
          <Heading mb='5'>{'Available Amount - Rs:' + amount}</Heading>
          <Button onPress={() => navigation.navigate('TopUp')}>TopUp</Button>
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

export default AvailableCredit;

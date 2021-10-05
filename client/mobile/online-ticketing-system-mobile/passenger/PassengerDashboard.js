import React, { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Center,
  Heading,
  ScrollView,
  VStack,
  Spacer,
  Divider,
  Pressable,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

const PassengerDashboard = ({ navigation }) => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    // const res = getData();
    // setAccount(res);
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('account');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  return (
    //   <Text>{JSON.stringify(account)}</Text>
    <Center mt='4' style={{ marginBottom: 'auto', marginTop: 'auto' }}>
      <VStack space={2.5} w='100%' alignItems='center'>
        <Flex
          direction='row'
          mb='2.5'
          mt='1.5'
          _text={{
            color: 'coolGray.800',
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('TopUp');
            }}
            _web={{
              cursor: 'pointer',
            }}>
            <Center mr='5' bg='primary.400' size='32'>
              <Text
                textAlign='center'
                _dark={{
                  color: 'primary.50',
                }}
                color='primary.50'>
                Top Up Account
              </Text>
            </Center>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Journey Details');
            }}
            _web={{
              cursor: 'pointer',
            }}>
            <Center size='32' bg='primary.400'>
              <Text
                textAlign='center'
                _dark={{
                  color: 'primary.50',
                }}
                color='primary.50'>
                Journey Details
              </Text>
            </Center>
          </Pressable>
        </Flex>
        <Spacer />

        <Flex
          direction='row'
          mb='2.5'
          mt='1.5'
          _text={{
            color: 'coolGray.800',
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('Available Credit');
            }}
            _web={{
              cursor: 'pointer',
            }}>
            <Center mr='5' bg='primary.400' size='32'>
              <Text
                textAlign='center'
                _dark={{
                  color: 'primary.50',
                }}
                color='primary.50'>
                Available Credit
              </Text>
            </Center>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Account Details');
            }}
            _web={{
              cursor: 'pointer',
            }}>
            <Center size='32' bg='primary.400'>
              <Text
                textAlign='center'
                _dark={{
                  color: 'primary.50',
                }}
                color='primary.50'>
                Account details
              </Text>
            </Center>
          </Pressable>
        </Flex>
      </VStack>
    </Center>
  );
};

const styles = StyleSheet.create({
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default PassengerDashboard;

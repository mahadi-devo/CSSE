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

const JourneyCreate = ({ navigation }) => {
  return (
    <Center style={{ marginTop: 'auto', marginBottom: 'auto' }}>
      <Pressable
        onPress={() => {
          navigation.navigate('Scanner');
        }}
        _web={{
          cursor: 'pointer',
        }}>
        <Center w='64' height={'180'} bg='primary.500' rounded='md' shadow={3}>
          {' '}
          <Text
            _dark={{
              color: 'primary.50',
            }}
            color='primary.50'
            fontSize='lg'>
            Bus Scanner
          </Text>{' '}
        </Center>
      </Pressable>
    </Center>
  );
};

export default JourneyCreate;

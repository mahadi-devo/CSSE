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
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const JourneyCreate = ({ navigation }) => {
  const [bus, onChangeBus] = useState(0);
  const [route, onChangeRoute] = useState(0);
  const handelOnPress = async () => {
    const res = await axios.post(
      'http://192.168.8.102:5000/api/v1/journey',
      {
        busId: bus,
        routeId: route,
      },
      config
    );
    navigation.navigate('On Journey',{journeyId: res.data.data.id});
  };

  return (
    <Center style={{ marginTop: 'auto', marginBottom: 'auto' }}>
      <FormControl w="64" p={3}>
        <FormControl.Label>Bus Id</FormControl.Label>
        <Input
          type="nuber"
          placeholder="Enter Bus Id"
          onChangeText={onChangeBus}
          value={bus}
        />
      </FormControl>
      <FormControl w="64" p={3}>
        <FormControl.Label>Route Id</FormControl.Label>
        <Input
          type="number"
          placeholder="Enter Route Id"
          onChangeText={onChangeRoute}
          value={route}
        />
      </FormControl>
      <Pressable
        onPress={handelOnPress}
        _web={{
          cursor: 'pointer',
        }}
      >
        <Center w="64" height={120} bg="primary.500" rounded="md" shadow={3}>
          {' '}
          <Text
            _dark={{
              color: 'primary.50',
            }}
            color="primary.50"
            fontSize="lg"
          >
            Start Journey
          </Text>{' '}
        </Center>
      </Pressable>
    </Center>
  );
};

export default JourneyCreate;

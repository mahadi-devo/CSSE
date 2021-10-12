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

const onJourney = (props) => {
  const { navigation, route } = props;

  const [journeyId, setJourneyId] = useState(route.params.journeyId);

  const handelOnPress = async () => {
    navigation.navigate('Scanner',{journeyId});
  };

  const handelStopOnPress = () => {
    navigation.pop();
  };

  return (
    <Center style={{ marginTop: 'auto', marginBottom: 'auto' }}>
      <Text bold fontSize="4xl">
        Journey Id : {journeyId}
      </Text>
      <Pressable
        p={5}
        onPress={handelOnPress}
        _web={{
          cursor: 'pointer',
        }}
      >
        <Center w="64" height={'180'} bg="primary.500" rounded="md" shadow={3}>
          {' '}
          <Text
            _dark={{
              color: 'primary.50',
            }}
            color="primary.50"
            fontSize="lg"
            bold 
            fontSize="xl"
          >
            Scan a Card
          </Text>{' '}
        </Center>
      </Pressable>

      <Pressable
        p={5}
        onPress={handelStopOnPress}
        _web={{
          cursor: 'pointer',
        }}
      >
        <Center w="64" height={'180'} bg="red.500" rounded="md" shadow={3}>
          {' '}
          <Text
            _dark={{
              color: 'primary.50',
            }}
            color="primary.50"
            fontSize="lg"
            bold 
            fontSize="xl"
          >
            Stop Journey
          </Text>{' '}
        </Center>
      </Pressable>
    </Center>
  );
};

export default onJourney;

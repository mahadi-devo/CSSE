import React, { useState, useEffect } from 'react';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from 'native-base';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';

Geocoder.init('AIzaSyBJ6etA3VFhb6LPKJ30iQj1Mf30o-OV4Ow');

const getGeoCode = async (lat, long) => {
  let addressComponent;
  await Geocoder.from(lat, long)
    .then((json) => {
      addressComponent = json.results[0].formatted_address;
      console.log(addressComponent);
    })
    .catch((error) => console.warn(error));

  return addressComponent;
};

const JourneyDetails = ({ route, navigation }) => {
  const [state, setState] = useState('');

  const { id } = route.params;

  useEffect(() => {
    apiCall();
  }, []);

  const dataMan = async (data) => {
    const arr = [];
    for (let index = 0; index < data.length; index++) {
      let obj = {
        id: data[index].id,
        fair: data[index].fare.amount,
        destination: await getGeoCode(
          parseInt(data[index].destinationLat),
          parseInt(data[index].destinationLong)
        ),
        start: await getGeoCode(
          parseInt(data[index].depatureLat),
          parseInt(data[index].depatureLong)
        ),
        timeStamp: data[index].journey.createdAt,
      };

      arr.push(obj);
    }

    setState(arr);
    console.log(state);
  };

  const apiCall = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/passenger/journey/account/${id}`
      );
      dataMan(res.data.data);
    } catch (error) {}
  };

  return (
    <Box
      w={{
        base: '100%',
        md: '25%',
      }}>
      {state.length > 0 ? (
        <FlatList
          mt='4'
          data={state}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth='1'
              _dark={{
                borderColor: 'gray.600',
              }}
              borderColor='coolGray.200'
              pl='4'
              pr='5'
              py='2'>
              <HStack space={3} justifyContent='space-between'>
                <VStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color='coolGray.800'
                    bold>
                    {'Fair - Rs: ' + item.fair}
                  </Text>
                  <Text
                    color='coolGray.600'
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    {'Departure - ' + item.destination}
                  </Text>
                  <Text
                    color='coolGray.600'
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    {'Destination - ' + item.start}
                  </Text>
                  <Text
                    color='coolGray.600'
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    {'Date - ' + item.timeStamp}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      ): (
          <Center>No data</Center>
      )}
    </Box>
  );
};

export default JourneyDetails;

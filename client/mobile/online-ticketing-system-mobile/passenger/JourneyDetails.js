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

Geocoder.init('AIzaSyBJ6etA3VFhb6LPKJ30iQj1Mf30o-OV4Ow');

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fair: 20,
    timeStamp: '12:47 PM',
    destinationLong: 79.8752768,
    destinationLat: 7.2351744,
    issuedLocationLat: 7.227817612991054,
    issuedLocationLong: 79.89985870079776,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    fair: 30,
    timeStamp: '11:11 PM',
    destinationLong: 79.8752768,
    destinationLat: 7.2351744,
    issuedLocationLat: 7.227817612991054,
    issuedLocationLong: 79.89985870079776,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fair: 10,
    timeStamp: '6:22 PM',
    destinationLong: 79.8752768,
    destinationLat: 7.2351744,
    issuedLocationLat: 7.227817612991054,
    issuedLocationLong: 79.89985870079776,
  },
  {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    fair: 60,
    timeStamp: '8:56 PM',
    destinationLong: 79.8752768,
    destinationLat: 7.2351744,
    issuedLocationLat: 7.227817612991054,
    issuedLocationLong: 79.89985870079776,
  },
  {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    fair: 80,
    timeStamp: '12:47 PM',
    recentText: 'I will call today.',
    destinationLong: 79.8752768,
    destinationLat: 7.2351744,
    issuedLocationLat: 7.227817612991054,
    issuedLocationLong: 79.89985870079776,
  },
];

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

const JourneyDetails = ({ navigation }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    dataMan();
  }, []);

  const dataMan = async () => {
    const arr = [];
    for (let index = 0; index < data.length; index++) {
      let obj = {
        id: data[index].id,
        fair: data[index].fair,
        destination: await getGeoCode(
          data[index].destinationLat,
          data[index].destinationLong
        ),
        start: await getGeoCode(
          data[index].issuedLocationLat,
          data[index].issuedLocationLong
        ),
      };

      arr.push(obj);
    }

    setState(arr);
  };
  return (
    <Box
      w={{
        base: '100%',
        md: '25%',
      }}>
      {state && (
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
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </Box>
  );
};

export default JourneyDetails;

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

const JourneyDetails = ({ navigation }) => {
  const [state, setState] = useState(null);
  const [account, setAccount] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    getData()
    try {
      const res = axios.get(`http://localhost/api/v1/journey/journeyDetails/${account.id}`);
      setData(res.data.data);

    } catch (error) {
      
    }
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

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('account');

      setAccount(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
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
      )}
    </Box>
  );
};

export default JourneyDetails;

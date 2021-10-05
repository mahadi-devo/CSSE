import React from 'react';
import {
  Button,
  ButtonGroup,
  VStack,
  Heading,
  Center,
  Pressable,
  Text,
  Box,
  Image,
} from 'native-base';

const InspectorDashboard = ({ navigation }) => {
  return (
    <>
      <VStack space={4} alignItems='center'>
        <Heading textAlign='center' mb='10'></Heading>
        <Pressable
          onPress={() => {
            navigation.navigate('Scan Ticket');
          }}
          _web={{
            cursor: 'pointer',
          }}>
          <Center
            w='64'
            height={'180'}
            bg='primary.500'
            rounded='md'
            shadow={3}>
            {' '}
            <Box>
              {' '}
              <Image size='lg' source={require('../assets/qr-code-scan.svg')} />
              <Text
                _dark={{
                  color: 'primary.50',
                }}
                color='primary.50'
                fontSize='lg'
                mt='2'>
                Scan Tickets
              </Text>{' '}
            </Box>
          </Center>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('Scan User');
          }}
          _web={{
            cursor: 'pointer',
          }}>
          <Center
            w='64'
            height={'180'}
            bg='primary.500'
            rounded='md'
            shadow={3}>
            {' '}
            <Text
              _dark={{
                color: 'primary.50',
              }}
              color='primary.50'
              fontSize='lg'>
              Scan Users
            </Text>{' '}
          </Center>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Inspector Details');
          }}
          _web={{
            cursor: 'pointer',
          }}>
          <Center
            w='64'
            height={'180'}
            bg='primary.500'
            rounded='md'
            shadow={3}>
            {' '}
            <Text
              _dark={{
                color: 'primary.50',
              }}
              color='primary.50'
              fontSize='lg'>
              View Inspection Details
            </Text>{' '}
          </Center>
        </Pressable>
      </VStack>
    </>
  );
};

export default InspectorDashboard;

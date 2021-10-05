import React, { useState, useEffect } from 'react';
import {
  ButtonGroup,
  VStack,
  Heading,
  Center,
  Box,
  Pressable,
} from 'native-base';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Dimensions } from 'react-native';
import ValidityScreen from './ValidityScreen';

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

const ScanUser = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const ticketdata = {
      id: 5,
      price: '100',
      destinationLong: '79.8752768',
      destinationLat: '7.2351744',
      issuedLocationLat: '7.227817612991054',
      issuedLocationLong: '79.89985870079776',
      ticketTypeId: '1',
      validityPeriod: '2021-11-02T17:47:00.281Z',
      updatedAt: '2021-10-03T17:47:00.287Z',
      createdAt: '2021-10-03T17:47:00.287Z',
    };

    const userData = {
      id: 49,
      name: 'pasindu',
      nic: '971422323V',
      address: 'ja-ela, Makewita',
      passportNo: '12121212',
      email: 'pasinduj9@gmail.com',
      accountId: 37,
      creditAmount: '100',
    };
    navigation.navigate('User Validity', JSON.parse(data));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    // <View style={styles.container}>
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={[StyleSheet.absoluteFill, styles.container]}>
      <Text style={styles.description}>Scan your QR code</Text>
      <Text onPress={() => navigation.pop()} style={styles.cancel}>
        Cancel
      </Text>
    </BarCodeScanner>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    width: '299px',
    height: '299px',
  },
  qr: {
    marginTop: '20%',
    marginBottom: '20%',
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.09,
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
});

export default ScanUser;

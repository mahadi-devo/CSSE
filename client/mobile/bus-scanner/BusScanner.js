import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Dimensions } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
export default function BusScanner({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [location, setLocation] = useState('');
  const journeyId = route.params.journeyId;

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getLastKnownPositionAsync({});

    setLocation(location);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const obj = JSON.parse(data);

    if (obj.creditAmount == 0 || obj.price == 0) {
      alert(`Not Valid`);
    } else {
      navigation.goBack();
      const res = await axios.post(
        'http://192.168.8.102:5000/api/v1/passenger/journey',
        {
          accountId: 36,
          journeyId,
          depatureLat: location.coords.latitude,
          depatureLong: location.coords.longitude,
          isFare: true,
          isFine: false,
        },
        config
      );
      alert(`successfully Scaned`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={[StyleSheet.absoluteFill, styles.container]}
    >
      <Text style={styles.description}> Pleas Scan your QR code</Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Cancel"
        color="#841584"
        accessibilityLabel="Learn more"
      />
    </BarCodeScanner>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});

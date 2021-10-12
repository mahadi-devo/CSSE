import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import BusScanner from './BusScanner';
import onJourney from './OnJourney';
import JourneyCreate from './JourneyCreate';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='create'>
          <Stack.Screen
            name='create'
            component={JourneyCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='On Journey' component={onJourney} />
          <Stack.Screen name='Scanner' component={BusScanner} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

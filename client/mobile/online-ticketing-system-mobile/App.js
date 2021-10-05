import React from 'react';
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InspectorDashboard from './inspector/InspectorDashboard';
import InspectionDetails from './inspector/InspectionDetails';
import Login from './components/Login';
import ScanTicket from './inspector/ScanTicket';
import ValidityScreen from './inspector/ValidityScreen';
import PassengerDashboard from './passenger/PassengerDashboard';
import TopUpAccount from './passenger/TopUpAccount';
import JourneyDetails from './passenger/JourneyDetails';
import AvailableCredit from './passenger/AvailableCredit';
import AccountDetails from './passenger/AccountDetails';
import Register from './components/Register';
import ScanUser from './inspector/ScanUser';
import ValidityScreenUser from './inspector/ValidityScreenUser';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Inspector Dashboard'
            component={InspectorDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Inspector Details'
            component={InspectionDetails}
          />
          <Stack.Screen name='Scan Ticket' component={ScanTicket} />
          <Stack.Screen name='Scan User' component={ScanUser} />
          <Stack.Screen name='Validity Screen' component={ValidityScreen} />
          <Stack.Screen name='User Validity' component={ValidityScreenUser} />
          <Stack.Screen
            name='Passenger Dashboard'
            component={PassengerDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='TopUp' component={TopUpAccount} />
          <Stack.Screen name='Journey Details' component={JourneyDetails} />
          <Stack.Screen name='Available Credit' component={AvailableCredit} />
          <Stack.Screen name='Account Details' component={AccountDetails} />
          <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

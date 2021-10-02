import CurrentActivity from '../../screens/myRoutines/CurrentActivity';
import MyRoutines from '../../screens/myRoutines/MyRoutines';
import React from 'react';
import RoutinesActivity from '../../screens/myRoutines/RoutinesActivity';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MyRoutinesNavigator = () => (
  <Stack.Navigator
    initialRouteName="MyRoutines"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="MyRoutines" component={MyRoutines} />
    <Stack.Screen name="Activities" component={RoutinesActivity} />
    <Stack.Screen name="CurrentActivity" component={CurrentActivity} />
  </Stack.Navigator>
);

export default MyRoutinesNavigator;

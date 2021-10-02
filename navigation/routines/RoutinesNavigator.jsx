import BrowseRoutines from '../../screens/routines/BrowseRoutines';
import CreateRoutine from '../../screens/routines/CreateRoutine';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RoutinesNavigator = () => (
  <Stack.Navigator
    initialRouteName="Create"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Create" component={CreateRoutine} />
    <Stack.Screen name="Browse" component={BrowseRoutines} />
  </Stack.Navigator>
);

export default RoutinesNavigator;

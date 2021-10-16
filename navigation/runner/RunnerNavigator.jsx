import React from 'react';
import RunnerList from '../../screens/runner/RunnerList';
import RunnerMap from '../../screens/runner/RunnerMap';
import RunnerScreen from '../../screens/runner/RunnerScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RunnerNavigator = () => (
  <Stack.Navigator
    initialRouteName="RunnerList"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="RunnerList" component={RunnerList} />
    <Stack.Screen name="RunnerScreen" component={RunnerScreen} />
    <Stack.Screen name="RunnerMap" component={RunnerMap} />
  </Stack.Navigator>
);

export default RunnerNavigator;

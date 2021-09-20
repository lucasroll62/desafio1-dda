import LoginScreen from '../../screens/user/LoginScreen';
import React from 'react';
import RecoverScreen from '../../screens/user/RecoverScreen';
import RegisterScreen from '../../screens/user/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Recover" component={RecoverScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;

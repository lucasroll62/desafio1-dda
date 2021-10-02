import AuthNavigator from './user/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabNavigator from './tab/TabNavigator';
import { useSelector } from 'react-redux';

const MainNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer>
      {user
        ? <TabNavigator />
        : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;

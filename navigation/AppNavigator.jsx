import AuthNavigator from './user/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabNavigator from './tab/TabNavigator';
import { useSelector } from 'react-redux';

const MainNavigator = () => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <NavigationContainer>
      {userId
        ? <TabNavigator />
        : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;

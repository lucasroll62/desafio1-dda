import CategoriesScreen from '../screens/CategoriesScreen';
import ExcercisesScreen from '../screens/ExcercisesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import NotImplementedScreen from '../screens/NotImplemented';
import React from 'react';
import Tabs from '../constants/tabs';
import UserScreen from '../screens/UserScreen';
import colors from '../constants/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => (
        {
          tabBarIcon: (
            { color, size },
          ) => <Icon name={route.params.icon} size={size} color={color} />,
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          tabBarStyle: { backgroundColor: colors.tabBackground },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            fontFamily: 'nunito-bold',
          },
        })}
    >
      <Tab.Screen
        name={Tabs[0].id}
        options={{
          title: Tabs[0].title,
        }}
        initialParams={{ icon: Tabs[0].icon }}
        component={UserScreen}
      />
      <Tab.Screen
        name={Tabs[1].id}
        options={{
          title: Tabs[1].title,
        }}
        initialParams={{ icon: Tabs[1].icon }}
        component={CategoriesScreen}
      />
      <Tab.Screen
        name={Tabs[2].id}
        options={{
          title: Tabs[2].title,
        }}
        initialParams={{ icon: Tabs[2].icon }}
        component={ExcercisesScreen}
      />
      <Tab.Screen
        name={Tabs[3].id}
        options={{
          title: Tabs[3].title,
        }}
        initialParams={{ icon: Tabs[3].icon }}
        component={NotImplementedScreen}
      />
      <Tab.Screen
        name={Tabs[4].id}
        options={{
          title: Tabs[4].title,
        }}
        initialParams={{ icon: Tabs[4].icon }}
        component={NotImplementedScreen}
      />
      <Tab.Screen
        name={Tabs[5].id}
        options={{
          title: Tabs[5].title,
        }}
        initialParams={{ icon: Tabs[5].icon }}
        component={NotImplementedScreen}
      />
    </Tab.Navigator>
  </NavigationContainer>;
}

import React, { useState } from 'react';

import AppLoading from 'expo-app-loading';
import CategoriesScreen from './screens/CategoriesScreen';
import ExcercisesScreen from './screens/ExcercisesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import NotImplemented from './screens/NotImplemented';
import Tabs from './constants/tabs';
import UserScreen from './screens/UserScreen';
import colors from './constants/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });
  const [itemList, setItemList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [excercisesList, setExcercisesList] = useState([]);

  const renderUserScreen = () => (
    <UserScreen
      itemList={itemList}
      setItemList={setItemList}
    />
  );

  const renderCategoriesScreen = () => (
    <CategoriesScreen
      categoriesList={categoriesList}
      setCategoriesList={setCategoriesList}
      excercisesList={excercisesList}
    />
  );

  const renderExcercisesScreen = () => (
    <ExcercisesScreen
      excercisesList={excercisesList}
      setExcercisesList={setExcercisesList}
      categoriesList={categoriesList}
      setCategoriesList={setCategoriesList}
    />
  );

  const renderNotImplemented = () => (
    <NotImplemented />
  );

  const Tab = createBottomTabNavigator();

  if (!loaded) return <AppLoading />;
  return (
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
          component={renderUserScreen}
        />
        <Tab.Screen
          name={Tabs[1].id}
          options={{
            title: Tabs[1].title,
          }}
          initialParams={{ icon: Tabs[1].icon }}
          component={renderCategoriesScreen}
        />
        <Tab.Screen
          name={Tabs[2].id}
          options={{
            title: Tabs[2].title,
          }}
          initialParams={{ icon: Tabs[2].icon }}
          component={renderExcercisesScreen}
        />
        <Tab.Screen
          name={Tabs[3].id}
          options={{
            title: Tabs[3].title,
          }}
          initialParams={{ icon: Tabs[3].icon }}
          component={renderNotImplemented}
        />
        <Tab.Screen
          name={Tabs[4].id}
          options={{
            title: Tabs[4].title,
          }}
          initialParams={{ icon: Tabs[4].icon }}
          component={renderNotImplemented}
        />
        <Tab.Screen
          name={Tabs[5].id}
          options={{
            title: Tabs[5].title,
          }}
          initialParams={{ icon: Tabs[5].icon }}
          component={renderNotImplemented}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

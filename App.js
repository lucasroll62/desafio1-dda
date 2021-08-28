import React, { useState } from 'react';
import {
StyleSheet,
View
} from 'react-native';

import AppLoading from 'expo-app-loading';
import CategoriesScreen from './screens/CategoriesScreen';
import ExcercisesScreen from './screens/ExcercisesScreen';
import Header from './components/Header';
import NavBar from './components/NavBar';
import NotImplemented from './screens/NotImplemented';
import { StatusBar } from 'expo-status-bar';
import Tabs from './constants/tabs'
import UserScreen from './screens/UserScreen';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });
  const [selectedTab, setSelectedTab] = useState(Tabs[0]);
  const [itemList, setItemList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [excercisesList, setExcercisesList] = useState([]);

  if (!loaded) return <AppLoading />
  return (
    <View style={styles.container}>
      <View >
        <StatusBar hidden={true} />
        <Header title={selectedTab.title} />
      </View>
      <View style={styles.innerContainer}>
        {selectedTab.id === 0 && <UserScreen itemList={itemList} setItemList={setItemList} />}
        {selectedTab.id === 1 && <CategoriesScreen
          categoriesList={categoriesList}
          setCategoriesList={setCategoriesList}
          excercisesList={excercisesList}
        />}
        {selectedTab.id === 2 && <ExcercisesScreen
          excercisesList={excercisesList}
          setExcercisesList={setExcercisesList}
          categoriesList={categoriesList}
          setCategoriesList={setCategoriesList}
        />}
        {selectedTab.id === 3 && <NotImplemented />}
        {selectedTab.id === 4 && <NotImplemented />}
        {selectedTab.id === 5 && <NotImplemented />}
        <NavBar
          tabs={Tabs}
          setSelectedTab={setSelectedTab}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
  }
});
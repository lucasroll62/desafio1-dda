import AppLoading from 'expo-app-loading';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import React from 'react';
import { init } from './db';
import store from './store';
import { useFonts } from 'expo-font';

init();

export default function App() {
  const [loaded] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });

  if (!loaded) return <AppLoading />;
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

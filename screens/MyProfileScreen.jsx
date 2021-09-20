import { StyleSheet, View } from 'react-native';

import Button from '../components/CustomButton';
import React from 'react';
import { logout } from '../store/actions/auth.action';
import { useDispatch } from 'react-redux';

export default function MyProfileScreen() {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Button text="Log Out" onPress={() => dispatch(logout())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    padding: 20,
    backgroundColor: '#F0F0F0',
    flex: 1,
  },
});

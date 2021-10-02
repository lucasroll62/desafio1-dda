import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/CustomButton';
import React from 'react';
import { logout } from '../store/actions/auth.action';

export default function MyProfileScreen() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Button text="Log Out" onPress={() => dispatch(logout())} />
      <Text>
        user.mail
        {user.email}
      </Text>
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

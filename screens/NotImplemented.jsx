import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const NotImplemented = () => (
  <View style={styles.screen}>
    <Text>Sin implementar</Text>
  </View>
);

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

export default NotImplemented;

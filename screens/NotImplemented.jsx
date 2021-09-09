import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

export default function NotImplemented() {
  return (
    <View style={styles.screen}>
      <Text>Sin implementar</Text>
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

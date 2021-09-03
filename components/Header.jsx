import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import colors from '../constants/colors';

const Header = (props) => {
  const { title } = props;
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerText: {
    color: 'white',
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'nunito-bold',
  },
});

export default Header;

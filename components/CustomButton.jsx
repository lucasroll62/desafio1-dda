import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import React from 'react';
import colors from '../constants/colors';

const CustomButton = (props) => {
  const {
    text, onPress,
  } = props;

  return (
    <TouchableOpacity
      {...props}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    marginVertical: 20,
    padding: 10,
    borderRadius: 5,
    minWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'nunito-bold',
    fontSize: 16,
  },
});

export default CustomButton;

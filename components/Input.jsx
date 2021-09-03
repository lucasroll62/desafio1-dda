import { StyleSheet, TextInput } from 'react-native';

import React from 'react';

const Input = (props) => {
  const { style } = props;
  return (
    <TextInput
      {...props}
      style={{ ...styles.input, ...style }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;

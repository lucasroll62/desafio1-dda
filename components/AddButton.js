import { StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'

const AddButton = (props) => {
  const { handleOnPress } = props;
  return <TouchableOpacity
    style={styles.buttonContainer}
    onPress={handleOnPress}
  >
    <Icon name='plus' size={30} color='purple' />
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 40,
    height: 70,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
  }
});

export default AddButton;
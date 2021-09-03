import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import colors from '../constants/colors';

const CustomModal = (props) => {
  const {
    modalVisible, handleConfirm, children, title, handleCancel, textOk, textCancel, handleClose,
  } = props;

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  const handleCancelKeyboard = () => {
    if (keyboardOpen) {
      Keyboard.dismiss();
    } else {
      handleClose();
    }
  };

  const modalHeader = (
    <View style={styles.modalHeader}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider} />
    </View>
  );

  const modalFooter = (
    <View style={styles.modalFooter}>
      <View style={styles.divider} />
      <View style={{ flexDirection: 'row-reverse', margin: 10 }}>
        {textCancel && (
        <TouchableOpacity
          style={{ ...styles.actions, backgroundColor: colors.cancel }}
          onPress={handleCancel}
        >
          <Text style={styles.actionText}>{textCancel}</Text>
        </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleConfirm}
          style={{ ...styles.actions, backgroundColor: colors.accept }}
        >
          <Text style={styles.actionText}>{textOk}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const modalContainer = (
    <View style={styles.modalContainer}>
      {modalHeader}
      {children}
      {modalFooter}
    </View>
  );

  const modal = (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
    >
      <Pressable style={styles.modal} onPressOut={handleCancelKeyboard}>
        <View>
          {modalContainer}
        </View>
      </Pressable>
    </Modal>
  );

  return (modal);
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#00000099',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#f9fafb',
    width: '80%',
    borderRadius: 5,
  },
  modalHeader: {
    backgroundColor: colors.primary,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
    color: '#fff',
    fontFamily: 'nunito-bold',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
  },
  modalBody: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalFooter: {
  },
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'nunito-regular',
  },
});

export default CustomModal;

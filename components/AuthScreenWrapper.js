import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const AuthScreenWrapper = ({
  children, title, message, buttonText, buttonPath, displayRecovery,
}) => {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.screen}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {children}
        <View style={styles.prompt}>
          <Text style={styles.promptMessage}>{message}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(buttonPath)}>
            <Text style={styles.promptButton}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        {displayRecovery && (
        <View style={styles.prompt}>
          <Text style={styles.promptMessage}>¿Olvidaste tu contraseña?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Recover')}>
            <Text style={styles.promptButton}>Recuperar contraseña</Text>
          </TouchableOpacity>
        </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'nunito-bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  container: {
    width: '80%',
    maxWidth: 400,
    padding: 12,
    margin: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  prompt: {
    alignItems: 'center',
  },
  promptMessage: {
    fontSize: 16,
    fontFamily: 'nunito-regular',
    color: '#333',
  },
  promptButton: {
    fontSize: 16,
    fontFamily: 'nunito-bold',
    color: colors.primary,
  },
});

export default AuthScreenWrapper;

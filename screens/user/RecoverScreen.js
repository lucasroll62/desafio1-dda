import {
  Alert,
  Keyboard,
} from 'react-native';
import { FORM_INPUT_UPDATE, formReducer } from './formReducer';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

import AuthScreenWrapper from '../../components/AuthScreenWrapper';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';
import getAuthUrlByType from '../../constants/database';

const RecoverScreen = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [message, setMessage] = useState('');
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

  useEffect(() => {
    if (message && message.length > 0) {
      Alert.alert(
        'Error',
        message,
        [{ text: 'Ok' }],
      );
      setMessage('');
    }
  }, [message]);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
    },
    inputValidities: {
      email: false,
    },
    formIsValid: false,
  });

  const handleSignUp = async () => {
    if (keyboardOpen) {
      Keyboard.dismiss();
    }
    if (formState.formIsValid) {
      try {
        await fetch(getAuthUrlByType('sendOobCode'), {
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: formState.inputValues.email,
          }),
        });
        setMessage('Se envió mail para restablecer contraseña.');
      } catch (error) {
        setMessage('No se pudo enviar email para recuperación de contraseña.');
      }
    } else {
      setMessage('Ingresa email y usuario válido');
    }
  };

  const onInputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    formDispatch({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  }, [formDispatch]);

  return (
    <AuthScreenWrapper
      title="RECUPERAR CONTRASEÑA"
      message="¿Ya tienes cuenta?"
      buttonText="Ingresar"
      buttonPath="Login"
      displayRecovery={false}
    >
      <Input
        id="email"
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        errorText="Por favor ingresa un email válido"
        required
        email
        onInputChange={onInputChangeHandler}
      />
      <CustomButton onPress={handleSignUp} text="ENVIAR MAIL DE RECUPERACIÓN" />
    </AuthScreenWrapper>
  );
};

export default RecoverScreen;

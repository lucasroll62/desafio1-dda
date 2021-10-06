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
import { clearMessage, login } from '../../store/actions/auth.action';
import { useDispatch, useSelector } from 'react-redux';

import AuthScreenWrapper from '../../components/AuthScreenWrapper';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.message);
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

  useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      Alert.alert(
        'Error',
        errorMessage,
        [{ text: 'Ok' }],
      );
      dispatch(clearMessage());
    }
  }, [errorMessage]);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const handleLogIn = () => {
    if (keyboardOpen) {
      Keyboard.dismiss();
    }
    if (!formState.formIsValid) {
      dispatch(login(formState.inputValues.email, formState.inputValues.password));
    } else {
      Alert.alert(
        'Formulario inválido',
        'Ingresa email y usuario válido',
        [{ text: 'Ok' }],
      );
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
      title="INGRESAR"
      message="¿Aún no tienes cuenta?"
      buttonText="Ir al registro"
      buttonPath="Register"
      displayRecovery
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
      <Input
        id="password"
        label="Password"
        secureTextEntry
        autoCapitalize="none"
        errorText="Ingrese contraseña"
        required
        onInputChange={onInputChangeHandler}
      />
      <CustomButton onPress={handleLogIn} text="INGRESAR" />
    </AuthScreenWrapper>
  );
};

export default LoginScreen;

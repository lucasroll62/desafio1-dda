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
import { signup } from '../../store/actions/auth.action';
import { useDispatch } from 'react-redux';

const RegisterScreen = () => {
  const dispatch = useDispatch();
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

  const handleSignUp = () => {
    if (keyboardOpen) {
      Keyboard.dismiss();
    }
    if (formState.formIsValid) {
      dispatch(signup(formState.inputValues.email, formState.inputValues.password));
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
      title="REGISTRO"
      message="¿Ya tienes cuenta?"
      buttonText="Ingresar"
      buttonPath="Login"
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
        errorText="La contraseña debe ser mínimo 6 caracteres"
        required
        minLength={6}
        onInputChange={onInputChangeHandler}
      />
      <CustomButton onPress={handleSignUp} text="REGISTRARME" />
    </AuthScreenWrapper>
  );
};

export default RegisterScreen;

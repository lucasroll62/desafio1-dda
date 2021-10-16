import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { clearErrorMessage, updateUser } from '../store/actions/user.actions';
import { logout, updateUserData } from '../store/actions/auth.action';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/CustomButton';
import EditModal from '../components/CustomModal';
import Spinner from '../components/Spinner';

export default function MyProfileScreen() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [inputError, setInputError] = useState('');
  const [auxUser, setAuxUser] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const errorMessage = useSelector((state) => state.users.errorMessage);
  const updateSuccess = useSelector((state) => state.users.updateSuccess);
  const isLoading = useSelector((state) => state.users.isLoading);

  useEffect(() => {
    setAuxUser(user);
  }, [user]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(updateUserData({
        ...auxUser,
        name: inputName,
        lastName: inputLastName,
        age: inputAge,
      }));
      setInputName('');
      setInputLastName('');
      setInputAge('');
      setInputError('');
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      setTimeout(() => {
        Alert.alert(
          'Error',
          errorMessage,
          [{ text: 'OK', onPress: () => dispatch(clearErrorMessage()) }],
        );
      }, 400);
    }
  }, [errorMessage]);

  const handleOpenEditItem = () => {
    setEditModalVisible(true);

    if (auxUser.name) {
      setInputName(auxUser.name);
    }

    if (auxUser.lastName) {
      setInputLastName(auxUser.lastName);
    }

    if (auxUser.age) {
      setInputAge(auxUser.age);
    }
  };

  const handleChangeName = (text) => {
    setInputName(text);
    setInputError('');
  };

  const handleChangeLastName = (text) => {
    setInputLastName(text);
    setInputLastName(text);
    setInputError('');
  };

  const handleChangeAge = (text) => {
    setInputAge(text.replace(/[^0-9]/g, ''));
    setInputAge(text.replace(/[^0-9]/g, ''));
    setInputError('');
  };

  const handleEditItem = () => {
    if (!inputName) {
      setInputError('Debe completar el nombre');
      return;
    }
    if (!inputLastName) {
      setInputError('Debe completar el apellido');
      return;
    }
    if (!inputAge) {
      setInputError('Debe completar la edad');
      return;
    }

    dispatch(updateUser({
      ...auxUser,
      name: inputName,
      lastName: inputLastName,
      age: inputAge,
    }));

    setEditModalVisible(false);
  };

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Button text="Log Out" onPress={() => dispatch(logout())} />
      <View style={styles.profileContainer}>
        {user && (
        <View>
          <Text style={{ margin: 10 }}>
            Nombre:
            {' '}
            {user.name}
          </Text>
          <Text style={{ margin: 10 }}>
            Apellido:
            {' '}
            {user.lastName}
          </Text>
          <Text style={{ margin: 10 }}>
            Email:
            {' '}
            {user.email}
          </Text>
          <Text style={{ margin: 10 }}>
            Edad:
            {' '}
            {user.age}
          </Text>

          <Button text="Editar" onPress={handleOpenEditItem} />
        </View>
        )}
      </View>
      <EditModal
        modalVisible={editModalVisible}
        selectedUser={auxUser}
        handleConfirm={handleEditItem}
        handleCancel={() => setEditModalVisible(false)}
        handleClose={() => setEditModalVisible(false)}
        title="Editar información"
        textOk="Si"
        textCancel="No"
      >
        <View style={{ margin: 30 }}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="words"
              placeholder={auxUser && auxUser.name ? auxUser.name : 'Nombre'}
              style={styles.input}
              onChangeText={handleChangeName}
              value={inputName}
              autoCorrect={false}
              autoFocus
              placeholderTextColor="gray"
            />
            <TextInput
              autoCapitalize="words"
              placeholder={auxUser && auxUser.lastName ? auxUser.lastName : 'Apellido'}
              style={styles.input}
              onChangeText={handleChangeLastName}
              value={inputLastName}
              autoCorrect={false}
              placeholderTextColor="gray"
            />
            <TextInput
              placeholder={auxUser && auxUser.age ? auxUser.age : 'Edad'}
              style={styles.input}
              onChangeText={handleChangeAge}
              keyboardType="numeric"
              value={inputAge}
              maxLength={2}
              placeholderTextColor="gray"
            />
          </View>

          <Text style={styles.inputError}>{inputError}</Text>
        </View>
        {isLoading && <Spinner />}
      </EditModal>
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
  profileContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  input: {
    width: 300,
    padding: 20,
  },
  inputError: {
    color: 'red',
  },
});

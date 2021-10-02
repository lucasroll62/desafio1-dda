import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getRoutines,
  removeRoutine,
  selectRoutine,
  updateUsers,
} from '../../store/actions/routine.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import DeleteModal from '../../components/CustomModal';
import Spinner from '../../components/Spinner';
import ViewModal from '../../components/CustomModal';
import {
  clearErrorMessage,
} from '../../store/actions/excercise.actions';

export default function BrowseRoutines() {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users.list);
  const routinesList = useSelector((state) => state.routines.list);
  const selectedRoutine = useSelector((state) => state.routines.selected);
  const errorMessage = useSelector((state) => state.routines.errorMessage);
  const isLoading = useSelector((state) => state.routines.isLoading);
  const addSuccess = useSelector((state) => state.routines.addSuccess);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [viewModalVisible, setViewModalVisible] = useState(false);

  const [usersSelected, setUsersSelected] = useState([]);

  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) dispatch(getRoutines());
  }, [isFocused]);

  useEffect(() => {
    if (addSuccess) {
      setTimeout(() => {
        dispatch(getRoutines());
      }, 400);
    }
  }, [addSuccess]);

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

  const handleConfirmDelete = () => {
    const { id } = selectedRoutine;
    dispatch(removeRoutine(id));
    setDeleteModalVisible(false);
    dispatch(selectRoutine({}));
  };

  const handleDeleteModal = (id) => {
    dispatch(selectRoutine(routinesList.find((item) => item.id === id)));
    setDeleteModalVisible(true);
  };

  const handleViewModal = (id) => {
    const currentRoutine = routinesList.find((item) => item.id === id);
    dispatch(selectRoutine(currentRoutine));
    const currentUsers = currentRoutine.users || [];
    const toggledUsers = usersList.map((u) => ({
      id: u.id,
      checked: currentUsers.includes(u.id),
    }));
    setUsersSelected(toggledUsers);
    setViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
    dispatch(selectRoutine({}));
  };

  const displayName = (item) => (item.name && item.lastName && `${item.name} ${item.lastName}`)
  || (item.name && !item.lastName && item.name) || (!item.name && item.lastName && item.lastName)
  || (!item.name && !item.lastName && item.email);

  const toggleSwitch = (e, index) => {
    const newUsersSelected = [...usersSelected];
    newUsersSelected[index].checked = e;
    setUsersSelected(newUsersSelected);
  };

  const handleConfirmUsers = () => {
    const curatedUsers = usersSelected.filter((users) => users.checked).map((k) => k.id);
    const updatedRoutine = {
      ...selectedRoutine,
      users: curatedUsers,
    };
    dispatch(updateUsers(updatedRoutine));
    handleCloseViewModal();
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Crear Rutina"
        onPress={() => {
          navigation.navigate('Create');
        }}
      />
      {routinesList && routinesList.length > 0 && (
      <FlatList
        data={routinesList}
        renderItem={(data) => (
          <View style={[styles.item, styles.shadow]}>
            <TouchableOpacity onPress={() => handleViewModal(data.item.id)}>
              <View>
                <Text>
                  {data.item.name}
                  {' '}
                  {data.item.lastName}
                </Text>
              </View>
            </TouchableOpacity>
            <Button
              title="X"
              color="#AAAAAA"
              onPress={() => handleDeleteModal(data.item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      )}
      {selectedRoutine && (
      <DeleteModal
        modalVisible={deleteModalVisible}
        categorySelected={selectedRoutine}
        handleConfirm={handleConfirmDelete}
        handleCancel={() => setDeleteModalVisible(false)}
        handleClose={() => setDeleteModalVisible(false)}
        title="Eliminar Rutina"
        textOk="Si"
        textCancel="No"
      >
        <View style={{ margin: 30 }}>
          <Text style={styles.modalMessage}>¿Está seguro que desea eliminar la rutina?</Text>
          <Text style={styles.modalCategory}>
            {selectedRoutine.name}
            {' '}
          </Text>
        </View>
      </DeleteModal>
      )}
      {selectedRoutine && (
      <ViewModal
        modalVisible={viewModalVisible}
        categorySelected={selectedRoutine}
        handleConfirm={handleConfirmUsers}
        handleClose={handleCloseViewModal}
        handleCancel={handleCloseViewModal}
        title="Ver Rutina"
        textOk="Confirmar"
        textCancel="Cancelar"
      >
        <View style={{ margin: 30 }}>
          <View style={styles.viewContainer}>
            <View style={styles.viewRow}>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewType}>Nombre: </Text>
              </View>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewItem}>
                  {selectedRoutine.name}
                </Text>
              </View>
            </View>
            <View style={styles.viewRow}>
              <FlatList
                data={selectedRoutine.excercises}
                renderItem={(data) => (
                  <View style={styles.excercisesContainer}>
                    <Text>
                      [
                      {data.item.categoryName}
                      ]
                      {' '}
                      {data.item.name}
                      {' '}
                      -
                      {' '}
                      {data.item.series}
                      x
                      {data.item.repeats}
                      {' '}
                      {data.item.kgs}
                      Kgs
                    </Text>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={styles.viewRow}>
              <FlatList
                data={usersList}
                renderItem={(data) => (
                  <View style={[styles.item, styles.shadow]}>
                    <TouchableOpacity onPress={() => handleViewModal(data.item.id)}>
                      <View>
                        <Text>
                          {displayName(data.item)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Switch
                      trackColor={{ false: '#767577', true: 'green' }}
                      thumbColor={usersSelected[data.index].checked ? 'white' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={(e) => toggleSwitch(e, data.index)}
                      value={usersSelected[data.index].checked}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </ViewModal>
      )}
      {isLoading && <Spinner />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: '#F0F0F0',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: 300,
    padding: 20,
  },
  inputError: {
    color: 'red',
  },
  items: {
    marginTop: 20,
  },
  item: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  viewContainer: {
    flexDirection: 'column',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  viewItemContainer: {
    marginHorizontal: 10,
  },
  viewItem: {
    fontWeight: 'bold',
    fontFamily: 'nunito-bold',
  },
  viewDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
  modalCategory: {
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'nunito-bold',
  },
  container: {
    flex: 1,
  },
  categoryHeaderText: {
    fontWeight: 'bold',
    fontFamily: 'nunito-bold',
    fontSize: 16,
    color: 'black',
  },
  categoryHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#90e0ef',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

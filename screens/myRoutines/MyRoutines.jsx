import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getMyRoutines,
  selectRoutine,
  startActivity,
} from '../../store/actions/routine.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import Spinner from '../../components/Spinner';
import ViewModal from '../../components/CustomModal';
import {
  clearErrorMessage,
} from '../../store/actions/excercise.actions';

export default function MyRoutines() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const routinesList = useSelector((state) => state.routines.list);
  const selectedRoutine = useSelector((state) => state.routines.selected);
  const errorMessage = useSelector((state) => state.routines.errorMessage);
  const isLoading = useSelector((state) => state.routines.isLoading);
  const addSuccess = useSelector((state) => state.routines.addSuccess);
  const currentActivity = useSelector((state) => state.routines.currentActivity);

  const [viewModalVisible, setViewModalVisible] = useState(false);

  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) dispatch(getMyRoutines(user));
  }, [isFocused]);

  useEffect(() => {
    if (addSuccess) {
      dispatch(getMyRoutines(user));
    }
  }, [addSuccess]);

  useEffect(() => {
    if (currentActivity) {
      navigation.navigate('CurrentActivity', currentActivity);
    }
  }, [currentActivity]);

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

  const handleViewModal = (id) => {
    const currentRoutine = routinesList.find((item) => item.id === id);
    dispatch(selectRoutine(currentRoutine));
    setViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
  };

  const handleStartActivity = () => {
    dispatch(startActivity(selectedRoutine, user));
    setViewModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Ver Actividades"
        onPress={() => {
          navigation.navigate('Activities');
        }}
      />
      <FlatList
        data={routinesList}
        renderItem={(data) => (
          <TouchableOpacity onPress={() => handleViewModal(data.item.id)}>
            <View style={[styles.item, styles.shadow]}>
              <View>
                <Text>
                  {data.item.name}
                  {' '}
                  {data.item.lastName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <ViewModal
        modalVisible={viewModalVisible}
        categorySelected={selectedRoutine}
        handleConfirm={handleStartActivity}
        handleClose={handleCloseViewModal}
        handleCancel={handleCloseViewModal}
        title="Ver Rutina"
        textOk="Iniciar Rutina"
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
                  {selectedRoutine ? selectedRoutine.name : ''}
                </Text>
              </View>
            </View>
            <View style={styles.viewRow}>
              {selectedRoutine && (
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
              )}
            </View>
          </View>
        </View>
      </ViewModal>
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
    margin: 10,
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

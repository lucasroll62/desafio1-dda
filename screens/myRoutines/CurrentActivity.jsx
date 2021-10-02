import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  endActivity,
  selectRoutine,
} from '../../store/actions/routine.actions';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../components/Spinner';
import ViewModal from '../../components/CustomModal';
import {
  clearErrorMessage,
} from '../../store/actions/excercise.actions';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

export default function CurrentActivity({ route }) {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.routines.errorMessage);
  const isLoading = useSelector((state) => state.routines.isLoading);
  const activityEnd = useSelector((state) => state.routines.activityEnd);
  const currentActivity = route.params;
  const selectedRoutine = currentActivity.currentRoutine;

  const [viewModalVisible, setViewModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (activityEnd) {
      navigation.navigate('Activities');
    }
  }, [activityEnd]);

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

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
    dispatch(selectRoutine({}));
  };

  return (
    <View style={styles.screen}>
      {/* <Button
        title="Ver mis actividades"
        onPress={() => {
          navigation.navigate('Activities');
        }}
      /> */}
      <FlatList
        data={selectedRoutine.excercises}
        renderItem={(data) => (
          <View style={[styles.item, styles.shadow]}>
            <TouchableOpacity>
              <View>
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
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={{ ...styles.actions, backgroundColor: colors.cancel }}
          onPress={() => dispatch(endActivity(currentActivity.id))}
        >
          <Text style={styles.actionText}>Terminar Actividad</Text>
        </TouchableOpacity>
      </View>
      <ViewModal
        modalVisible={viewModalVisible}
        categorySelected={selectedRoutine}
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
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'nunito-regular',
  },
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 10,
    alignSelf: 'center',
  },
  statusContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 30,
    marginTop: 20,
  },
});

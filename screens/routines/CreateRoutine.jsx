import {
  Alert,
  Button,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  clearErrorMessage,
  getExcercises,
  selectExcercise,
} from '../../store/actions/excercise.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import AddExcerciseModal from '../../components/CustomModal';
import AddModal from '../../components/CustomModal';
import DeleteModal from '../../components/CustomModal';
import Spinner from '../../components/Spinner';
import { addRoutine } from '../../store/actions/routine.actions';
import colors from '../../constants/colors';
import { getCategories } from '../../store/actions/category.actions';
import { v4 as uuidv4 } from 'uuid';

export default function CreateRoutine() {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories.list);
  const excercisesList = useSelector((state) => state.excercises.list);
  const selectedExcercise = useSelector((state) => state.excercises.selected);
  const errorMessage = useSelector((state) => state.routines.errorMessage);
  const isLoading = useSelector((state) => state.routines.isLoading);
  const addSuccess = useSelector((state) => state.routines.addSuccess);
  const [excercisesQty, setExcercisesQty] = useState(0);

  const [inputName, setInputName] = useState('');
  const [inputError, setInputError] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addExcerciseModalVisible, setAddExcerciseModalVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [routine, setRoutine] = useState({
    excercises: [],
    users: [],
    id: uuidv4(),
  });
  const [inputSeries, setInputSeries] = useState('');
  const [inputRepeats, setInputRepeats] = useState('');
  const [inputKgs, setInputKgs] = useState('');

  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(getExcercises());
      dispatch(getCategories());
    }
  }, [isFocused]);

  useEffect(() => {
    setExcercisesQty(routine.excercises.length);
  }, [routine]);

  useEffect(() => {
    if (addSuccess) {
      clearRoutine();
      navigation.navigate('Browse');
    }
  }, [addSuccess]);

  useEffect(() => {
    setListData(categoriesList.map((item) => ({
      title: item.name,
      categoryId: item.id,
      data: excercisesList.filter((ex) => ex.categoryId === item.id),
    })));
  }, [excercisesList, categoriesList]);

  const clearRoutine = () => {
    setRoutine({
      excercises: [],
      users: [],
      id: uuidv4(),
    });
  };

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

  const handleChangeName = (text) => {
    setInputName(text);
    setInputError('');
  };

  const handleChangeRepeats = (text) => {
    setInputRepeats(text.replace(/[^0-9]/g, ''));
    setInputError('');
  };

  const handleChangeSeries = (text) => {
    setInputSeries(text.replace(/[^0-9]/g, ''));
    setInputError('');
  };

  const handleChangeKgs = (text) => {
    setInputKgs(text.replace(/[^0-9]/g, ''));
    setInputError('');
  };

  const handleAddExcerciseModal = (id) => {
    dispatch(selectExcercise(excercisesList.find((item) => item.id === id)));
    setAddExcerciseModalVisible(true);
  };

  const handleCloseAddExcerciseModal = () => {
    setAddExcerciseModalVisible(false);
    dispatch(selectExcercise({}));
  };

  const handleDeleteModal = (id) => {
    dispatch(selectExcercise(excercisesList.find((item) => item.id === id)));
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    const newExcercises = routine.excercises.filter((k) => k.id !== selectedExcercise.id);

    setRoutine({
      ...routine,
      excercises: newExcercises,
    });

    setDeleteModalVisible(false);
    dispatch(selectExcercise({}));
  };

  const handleConfirmAddExcercise = () => {
    if (!inputSeries) {
      setInputError('Debe completar las series');
      return;
    }
    if (!inputRepeats) {
      setInputError('Debe completar las repeticiones');
      return;
    }
    if (!inputKgs) {
      setInputError('Debe completar los Kgs.');
      return;
    }

    const newExcercises = routine.excercises;
    newExcercises.push({
      ...selectedExcercise,
      series: inputSeries,
      repeats: inputRepeats,
      kgs: inputKgs,
      categoryName: categoriesList.find((k) => k.id === selectedExcercise.categoryId).name,
    });

    setRoutine({
      ...routine,
      excercises: newExcercises,
    });

    setInputRepeats('');
    setInputSeries('');
    setInputKgs('');
    setInputError('');
    setAddExcerciseModalVisible(false);
  };

  const handleAddRoutine = () => {
    if (!inputName) {
      setInputError('Debe completar el nombre');
      return;
    }

    dispatch(addRoutine({
      id: uuidv4(),
      name: inputName,
      ...routine,
    }));

    setInputName('');
    setInputError('');
    setAddModalVisible(false);
  };

  const renderHeader = (title) => (
    <View style={{ backgroundColor: '#F0F0F0' }}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderText}>{title}</Text>
      </View>
    </View>
  );

  const renderItem = (item) => {
    const isSelected = () => {
      if (routine.excercises.find((k) => k.id === item.id)) {
        return true;
      }
      return false;
    };

    return (
      <View style={[
        styles.item, styles.shadow, isSelected() ? styles.selected : styles.unselected]}
      >
        <TouchableOpacity
          onPress={
            () => (isSelected() ? handleDeleteModal(item.id) : handleAddExcerciseModal(item.id))
          }
        >
          <View>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Ver Rutinas"
        onPress={() => {
          navigation.navigate('Browse');
        }}
      />
      <SectionList
        sections={listData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => renderItem(item)}
        renderSectionHeader={({ section: { title, categoryId } }) => (
          renderHeader(title, categoryId)
        )}
      />
      <View style={styles.statusContainer}>
        <Text>
          Ejercicios:
          {excercisesQty}
        </Text>
        <TouchableOpacity
          style={{ ...styles.actions, backgroundColor: excercisesQty > 0 ? colors.cancel : 'gray' }}
          onPress={() => (excercisesQty > 0 ? clearRoutine() : {})}
        >
          <Text style={styles.actionText}>Reestablecer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => (excercisesQty > 0 ? setAddModalVisible(true) : {})}
          style={{ ...styles.actions, backgroundColor: excercisesQty > 0 ? colors.accept : 'gray' }}
        >
          <Text style={styles.actionText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
      <AddModal
        modalVisible={addModalVisible}
        categorySelected={selectedExcercise}
        handleConfirm={handleAddRoutine}
        handleCancel={() => setAddModalVisible(false)}
        handleClose={() => setAddModalVisible(false)}
        title="Guardar Rutina"
        textOk="Si"
        textCancel="No"
      >
        <View style={{ margin: 30 }}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="words"
              placeholder="Nombre"
              style={styles.input}
              onChangeText={handleChangeName}
              value={inputName}
              autoCorrect={false}
              autoFocus
              placeholderTextColor="gray"
            />
          </View>
          <Text style={styles.inputError}>{inputError}</Text>
        </View>
        <FlatList
          data={routine.excercises}
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
      </AddModal>
      <DeleteModal
        modalVisible={deleteModalVisible}
        categorySelected={selectedExcercise}
        handleConfirm={handleConfirmDelete}
        handleCancel={() => setDeleteModalVisible(false)}
        handleClose={() => setDeleteModalVisible(false)}
        title="Eliminar ejercicio"
        textOk="Si"
        textCancel="No"
      >
        <View style={{ margin: 30 }}>
          <Text style={styles.modalMessage}>¿Está seguro que desea eliminar el ejercicio?</Text>
          <Text style={styles.modalCategory}>{selectedExcercise.name}</Text>
        </View>
      </DeleteModal>
      <AddExcerciseModal
        modalVisible={addExcerciseModalVisible}
        categorySelected={selectedExcercise}
        handleConfirm={handleConfirmAddExcercise}
        handleCancel={handleCloseAddExcerciseModal}
        handleClose={handleCloseAddExcerciseModal}
        title="Agregar ejercicio"
        textOk="Si"
        textCancel="No"
      >
        <View style={{ margin: 30 }}>
          <View style={styles.viewContainer}>
            <View style={styles.viewRow}>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewType}>Nombre: </Text>
              </View>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewItem}>
                  {selectedExcercise.name}
                </Text>
              </View>
            </View>
          </View>
          <TextInput
            placeholder="Series"
            style={styles.input}
            onChangeText={handleChangeSeries}
            keyboardType="numeric"
            value={inputSeries}
            maxLength={2}
            placeholderTextColor="gray"
            autoFocus
          />
          <TextInput
            placeholder="Repeticiones"
            style={styles.input}
            onChangeText={handleChangeRepeats}
            keyboardType="numeric"
            value={inputRepeats}
            maxLength={2}
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Kilos"
            style={styles.input}
            onChangeText={handleChangeKgs}
            keyboardType="numeric"
            value={inputKgs}
            maxLength={2}
            placeholderTextColor="gray"
          />
          <Text style={styles.inputError}>{inputError}</Text>
        </View>
      </AddExcerciseModal>
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
    padding: 16,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'green',
    fontWeight: 'bold',
  },
  unselected: {
    backgroundColor: 'white',
  },
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 10,
    alignSelf: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'nunito-regular',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    marginTop: 20,
  },
  excercisesContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

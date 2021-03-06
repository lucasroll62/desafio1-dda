import {
  Alert,
  Button,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  addExcercise,
  clearErrorMessage,
  getExcercises,
  removeExcercise,
  selectExcercise,
} from '../store/actions/excercise.actions';
import { useDispatch, useSelector } from 'react-redux';

import AddModal from '../components/CustomModal';
import DeleteModal from '../components/CustomModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from '../components/Spinner';
import ViewModal from '../components/CustomModal';
import { getCategories } from '../store/actions/category.actions';
import { useIsFocused } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';

export default function ExcercisesScreen() {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories.list);
  const excercisesList = useSelector((state) => state.excercises.list);
  const selectedExcercise = useSelector((state) => state.excercises.selected);
  const errorMessage = useSelector((state) => state.excercises.errorMessage);
  const isLoading = useSelector((state) => state.excercises.isLoading);

  const [inputName, setInputName] = useState('');
  const [inputError, setInputError] = useState('');
  const [listReady, setListReady] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    dispatch(getExcercises());
    dispatch(getCategories());
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(getExcercises());
      dispatch(getCategories());
    }
  }, [isFocused]);

  useEffect(() => {
    const newListData = categoriesList.map((item) => ({
      title: item.name,
      categoryId: item.id,
      data: excercisesList.filter((ex) => ex.categoryId === item.id),
    }));
    setListData(newListData);
  }, [excercisesList, categoriesList, isLoading]);

  useEffect(() => {
    if (listData.length > 0) setListReady(true);
  }, [listData]);

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

  const handleAddItem = () => {
    if (!inputName) {
      setInputError('Debe completar el nombre');
      return;
    }

    dispatch(addExcercise({
      id: uuidv4(),
      name: inputName,
      categoryId: selectedCategoryId,
    }));

    setInputName('');
    setInputError('');
    setAddModalVisible(false);
  };

  const handleConfirmDelete = () => {
    const { id } = selectedExcercise;
    dispatch(removeExcercise(id));
    setDeleteModalVisible(false);
    dispatch(selectExcercise({}));
  };

  const handleDeleteModal = (id) => {
    dispatch(selectExcercise(excercisesList.find((item) => item.id === id)));
    setDeleteModalVisible(true);
  };

  const handleViewModal = (id) => {
    dispatch(selectExcercise(excercisesList.find((item) => item.id === id)));
    setViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
    dispatch(selectExcercise({}));
  };

  const handleAddNewExcercise = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setAddModalVisible(true);
  };

  const renderHeader = (title, categoryId) => (
    <View style={{ backgroundColor: '#F0F0F0' }}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderText}>{title}</Text>
        <TouchableOpacity onPress={() => handleAddNewExcercise(categoryId)}>
          <Icon name="plus" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = (item) => (
    <TouchableOpacity onPress={() => handleViewModal(item.id)}>
      <View style={[styles.item, styles.shadow]}>
        <View>
          <Text>{item.name}</Text>
        </View>
        <Button
          title="X"
          color="#AAAAAA"
          onPress={() => handleDeleteModal(item.id)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {listReady && listData.length > 0 && (
      <SectionList
        sections={listData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => renderItem(item)}
        renderSectionHeader={({ section: { title, categoryId } }) => (
          renderHeader(title, categoryId)
        )}
      />
      )}
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
          <Text style={styles.modalMessage}>??Est?? seguro que desea eliminar el ejercicio?</Text>
          <Text style={styles.modalCategory}>{selectedExcercise.name}</Text>
        </View>
      </DeleteModal>
      <AddModal
        modalVisible={addModalVisible}
        categorySelected={selectedExcercise}
        handleConfirm={handleAddItem}
        handleCancel={() => setAddModalVisible(false)}
        handleClose={() => setAddModalVisible(false)}
        title="Agregar ejercicio"
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
      </AddModal>
      <ViewModal
        modalVisible={viewModalVisible}
        categorySelected={selectedExcercise}
        handleConfirm={handleCloseViewModal}
        handleClose={handleCloseViewModal}
        title="Ver ejercicio"
        textOk="Cerrar"
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
    borderColor: 'black',
    borderWidth: 2,
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

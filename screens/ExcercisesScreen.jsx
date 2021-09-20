import {
  Button,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { addExcercise, removeExcercise, selectExcercise } from '../store/actions/excercise.actions';
import { useDispatch, useSelector } from 'react-redux';

import AddModal from '../components/CustomModal';
import DeleteModal from '../components/CustomModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../components/Input';
import ViewModal from '../components/CustomModal';

export default function ExcercisesScreen() {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories.list);
  const excercisesList = useSelector((state) => state.excercises.list);
  const selectedExcercise = useSelector((state) => state.excercises.selected);

  const [inputName, setInputName] = useState('');
  const [inputError, setInputError] = useState('');

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    setListData(categoriesList.map((item) => ({
      title: item.name,
      categoryId: item.id,
      data: excercisesList.filter((ex) => ex.categoryId === item.id),
    })));
  }, [excercisesList, categoriesList]);

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
      id: Math.random().toString(),
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
    <View style={[styles.item, styles.shadow]}>
      <TouchableOpacity onPress={() => handleViewModal(item.id)}>
        <View>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
      <Button
        title="X"
        color="#AAAAAA"
        onPress={() => handleDeleteModal(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <SectionList
        sections={listData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => renderItem(item)}
        renderSectionHeader={({ section: { title, categoryId } }) => (
          renderHeader(title, categoryId)
        )}
      />
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

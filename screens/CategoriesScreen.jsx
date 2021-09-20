import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { addCategory, removeCategory, selectCategory } from '../store/actions/category.actions';
import { connect, useDispatch, useSelector } from 'react-redux';

import AddButton from '../components/AddButton';
import AddModal from '../components/CustomModal';
import DeleteModal from '../components/CustomModal';
import Input from '../components/Input';
import ViewModal from '../components/CustomModal';

function CategoriesScreen() {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories.list);
  const excercisesList = useSelector((state) => state.excercises.list);
  const categorySelected = useSelector((state) => state.categories.selected);

  const [inputName, setInputName] = useState('');
  const [inputError, setInputError] = useState('');

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const handleChangeName = (text) => {
    setInputName(text);
    setInputError('');
  };

  const handleAddItem = () => {
    if (!inputName) {
      setInputError('Debe completar el nombre');
      return;
    }

    dispatch(addCategory({
      id: Math.random().toString(),
      name: inputName,
    }));
    setInputName('');
    setInputError('');
    setAddModalVisible(false);
  };

  const handleConfirmDelete = () => {
    const { id } = categorySelected;
    dispatch(removeCategory(id));
    setDeleteModalVisible(false);
    dispatch(selectCategory({}));
  };

  const handleDeleteModal = (id) => {
    if (excercisesList.some((item) => item.categoryId === id)) {
      Alert.alert('La categoria contiene ejercicios, debe eliminarlos primero.');
    } else {
      dispatch(selectCategory(categoriesList.find((item) => item.id === id)));
      setDeleteModalVisible(true);
    }
  };

  const handleViewModal = (id) => {
    dispatch(selectCategory(categoriesList.find((item) => item.id === id)));
    setViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
    dispatch(selectCategory({}));
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={categoriesList}
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
      <DeleteModal
        modalVisible={deleteModalVisible}
        categorySelected={categorySelected}
        handleConfirm={handleConfirmDelete}
        handleCancel={() => setDeleteModalVisible(false)}
        handleClose={() => setDeleteModalVisible(false)}
        title="Eliminar categoria"
        textOk="Si"
        textCancel="No"
      >
        <View style={{ margin: 30 }}>
          <Text style={styles.modalMessage}>¿Está seguro que desea eliminar la categoria?</Text>
          <Text style={styles.modalCategory}>{categorySelected.name}</Text>
        </View>
      </DeleteModal>
      <AddModal
        modalVisible={addModalVisible}
        categorySelected={categorySelected}
        handleConfirm={handleAddItem}
        handleCancel={() => setAddModalVisible(false)}
        handleClose={() => setAddModalVisible(false)}
        title="Agregar categoria"
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
        categorySelected={categorySelected}
        handleConfirm={handleCloseViewModal}
        handleClose={handleCloseViewModal}
        title="Ver categoria"
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
                  {categorySelected.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ViewModal>
      <AddButton handleOnPress={() => setAddModalVisible(true)} />
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
});

export default connect()(CategoriesScreen);

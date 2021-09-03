import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import AddButton from '../components/AddButton';
import AddModal from '../components/CustomModal';
import DeleteModal from '../components/CustomModal';
import Input from '../components/Input';
import ViewModal from '../components/CustomModal';

const UserScreen = (props) => {
  const { categoriesList, setCategoriesList, excercisesList } = props;

  const [inputName, setInputName] = useState('');
  const [inputError, setInputError] = useState('');

  const [categorySelected, setItemSelected] = useState({});
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

    setCategoriesList([
      ...categoriesList,
      {
        id: Math.random().toString(),
        name: inputName,
      },
    ]);
    setInputName('');
    setInputError('');
    setAddModalVisible(false);
  };

  const handleConfirmDelete = () => {
    const { id } = categorySelected;
    setCategoriesList(categoriesList.filter((item) => item.id !== id));
    setDeleteModalVisible(false);
    setItemSelected({});
  };

  const handleDeleteModal = (id) => {
    if (excercisesList.some((item) => item.categoryId === id)) {
      Alert.alert('La categoria contiene ejercicios, debe eliminarlos primero.');
    } else {
      setItemSelected(categoriesList.find((item) => item.id === id));
      setDeleteModalVisible(true);
    }
  };

  const handleViewModal = (id) => {
    setItemSelected(categoriesList.find((item) => item.id === id));
    setViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
    setItemSelected(false);
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
            <Input
              autoCapitalize="words"
              placeholder="Nombre"
              style={styles.input}
              onChangeText={handleChangeName}
              value={inputName}
              autoCorrect={false}
              autoFocus
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
};

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

export default UserScreen;

import {
  Button,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { useState } from 'react';

import AddButton from '../components/AddButton.js'
import AddModal from '../components/CustomModal';
import DeleteModal from '../components/CustomModal';
import Input from '../components/Input.js';
import ViewModal from '../components/CustomModal';

const UserScreen = (props) => {

  const { itemList, setItemList } = props;

  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [inputError, setInputError] = useState('');

  const [itemSelected, setItemSelected] = useState({});
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const handleChangeName = (text) => {
    setInputName(text)
    setInputError('');
  };

  const handleChangeLastName = (text) => {
    setInputLastName(text)
    setInputError('');
  };

  const handleChangeAge = (text) => {
    setInputAge(text.replace(/[^0-9]/g, ''))
    setInputError('');
  };

  const handleAddItem = () => {
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
    setItemList([
      ...itemList,
      {
        id: Math.random().toString(),
        name: inputName,
        lastName: inputLastName,
        age: inputAge
      },
    ]);
    setInputName('');
    setInputLastName('');
    setInputAge('');
    setInputError('');
    setAddModalVisible(false);
  }

  const handleConfirmDelete = () => {
    const id = itemSelected.id;
    setItemList(itemList.filter(item => item.id !== id));
    setDeleteModalVisible(false);
    setItemSelected({});
  }

  const handleDeleteModal = id => {
    setItemSelected(itemList.find(item => item.id === id));
    setDeleteModalVisible(true);
  }

  const handleViewModal = id => {
    setItemSelected(itemList.find(item => item.id === id));
    setViewModalVisible(true);
  }

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
    setItemSelected(false);
  }
  return (
    <View style={styles.screen}>
      <FlatList
        data={itemList}
        renderItem={data => {
          return (
            <View style={[styles.item, styles.shadow]} >
              <TouchableOpacity onPress={() => handleViewModal(data.item.id)}>
                <View>
                  <Text>{data.item.name} {data.item.lastName}</Text>
                </View>
              </TouchableOpacity>
              <Button
                title="X"
                color="#AAAAAA"
                onPress={() => handleDeleteModal(data.item.id)}
              />
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
      <DeleteModal
        modalVisible={deleteModalVisible}
        itemSelected={itemSelected}
        handleConfirm={handleConfirmDelete}
        handleCancel={() => setDeleteModalVisible(false)}
        handleClose={() => setDeleteModalVisible(false)}
        title={'Eliminar usuario'}
        textOk={'Si'}
        textCancel={'No'}
      >
        <View style={{ margin: 30 }}>
          <Text style={styles.modalMessage}>¿Está seguro que desea eliminar al usuario?</Text>
          <Text style={styles.modalUser}>{itemSelected.name} {itemSelected.lastName}</Text>
        </View>
      </DeleteModal>
      <AddModal
        modalVisible={addModalVisible}
        itemSelected={itemSelected}
        handleConfirm={handleAddItem}
        handleCancel={() => setAddModalVisible(false)}
        handleClose={() => setAddModalVisible(false)}
        title={'Agregar usuario'}
        textOk={'Si'}
        textCancel={'No'}
      >
        <View style={{ margin: 30 }}>

          <View style={styles.inputContainer}>
            <Input
              autoCapitalize={'words'}
              placeholder="Nombre"
              style={styles.input}
              onChangeText={handleChangeName}
              value={inputName}
              autoCorrect={false}
              autoFocus={true}
            />
            <Input
              autoCapitalize={'words'}
              placeholder="Apellido"
              style={styles.input}
              onChangeText={handleChangeLastName}
              value={inputLastName}
              autoCorrect={false}
            />
            <Input
              placeholder="Edad"
              style={styles.input}
              onChangeText={handleChangeAge}
              keyboardType='numeric'
              value={inputAge}
              maxLength={2}
            />
          </View>

          <Text style={styles.inputError}>{inputError}</Text>
        </View>
      </AddModal>
      <ViewModal
        modalVisible={viewModalVisible}
        itemSelected={itemSelected}
        handleConfirm={handleCloseViewModal}
        handleClose={handleCloseViewModal}
        title={'Ver usuario'}
        textOk={'Cerrar'}
      >
        <View style={{ margin: 30 }}>
          <View style={styles.viewContainer}>
            <View style={styles.viewRow}>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewType}>Nombre: </Text>
              </View>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewItem}>
                  {itemSelected.name}
                </Text>
              </View>
            </View>
            <View style={styles.viewDivider}></View>
            <View style={styles.viewRow}>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewType}>Apellido: </Text>
              </View>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewItem}>
                  {itemSelected.lastName}
                </Text>
              </View>
            </View>
            <View style={styles.viewDivider}></View>
            <View style={styles.viewRow}>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewType}>Edad: </Text>
              </View>
              <View style={styles.viewItemContainer}>
                <Text style={styles.viewItem}>
                  {itemSelected.age}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ViewModal>
      <AddButton handleOnPress={() => setAddModalVisible(true)} />
    </View >
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
    marginHorizontal: 10
  },
  viewItemContainer: {
    marginHorizontal: 10
  },
  viewItem: {
    fontWeight: 'bold',
    fontFamily: 'nunito-bold'
  },
  viewDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 10
  },
  modalUser: {
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'nunito-bold'
  },
  container: {
    flex: 1,
  },
});

export default UserScreen;
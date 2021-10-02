import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { getRoutines, getRoutinesActivities } from '../../store/actions/routine.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import Spinner from '../../components/Spinner';
import {
  clearErrorMessage,
} from '../../store/actions/excercise.actions';
import moment from 'moment';

export default function RoutinesActivity() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const errorMessage = useSelector((state) => state.routines.errorMessage);
  const isLoading = useSelector((state) => state.routines.isLoading);
  const listActivities = useSelector((state) => state.routines.listActivities);
  const listRoutines = useSelector((state) => state.routines.list);

  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(getRoutinesActivities(user));
      dispatch(getRoutines());
    }
  }, [isFocused]);

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

  const displayName = (item) => {
    const routine = listRoutines.find((k) => k.id === item.routineId);
    const startTime = moment(item.startTime * 1000);
    const endTime = item.endTime ? moment(item.endTime * 1000) : moment();
    const duration = moment.duration(endTime.diff(startTime));
    const minutes = Math.round(duration.asMinutes(), 2);
    return `${routine ? routine.name : 'N/A'} - ${startTime.format('DD/MM/YYYY')} - ${minutes} minutos`;
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Ver mis rutinas"
        onPress={() => {
          navigation.navigate('MyRoutines');
        }}
      />
      {listActivities && listRoutines && (
      <FlatList
        data={listActivities}
        renderItem={(data) => (
          <View style={[styles.item, styles.shadow]}>
            <View>
              <Text>
                {displayName(data.item)}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
  },
  excercisesContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

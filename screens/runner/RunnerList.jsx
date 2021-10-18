import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import Spinner from '../../components/Spinner';
import calcCrow from '../../utils/distance';
import {
  clearErrorMessage,
} from '../../store/actions/excercise.actions';
import { getRuns } from '../../store/actions/runner.actions';
import moment from 'moment';

export default function RunnerList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const errorMessage = useSelector((state) => state.runner.errorMessage);
  const isLoading = useSelector((state) => state.runner.isLoading);
  const runnerList = useSelector((state) => state.runner.list);

  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(getRuns(user));
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

  const viewMap = (item) => {
    navigation.navigate('RunnerMap', item);
  };

  const getTimeElapsed = (item) => {
    const keys = Object.keys(item).filter((k) => k !== 'id').filter((t) => item[t]);
    if (item[keys.length - 1]) {
      const diffTime = moment(item[keys.length - 1].location.timestamp)
        .diff(item[0].location.timestamp);
      const duration = moment.duration(diffTime);
      const hrs = duration.hours();
      const mins = duration.minutes();
      const secs = duration.seconds();

      return `${hrs}h ${mins}m ${secs}s`;
    }
    return '0h 0m 0s';
  };

  const getDistance = (item) => {
    let distance = 0;
    const keys = Object.keys(item).filter((k) => k !== 'id').filter((t) => item[t]);
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i + 1]) {
        distance += calcCrow(
          item[keys[i]].location.coords.latitude, item[keys[i]].location.coords.longitude,
          item[keys[i + 1]].location.coords.latitude, item[keys[i + 1]].location.coords.longitude,
        );
      }
    }

    return distance.toFixed(2);
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Nueva Ruta"
        onPress={() => {
          navigation.navigate('RunnerScreen');
        }}
      />
      {runnerList && (
      <FlatList
        data={runnerList}
        renderItem={(data) => (
          <TouchableOpacity onPress={() => viewMap(data.item)}>
            <View style={[styles.item, styles.shadow]}>
              <View>
                <Text>
                  {moment(data.item[0].location.timestamp).format('DD/MM/YYYY HH:mm:ss')}
                  {' '}
                  {getTimeElapsed(data.item)}
                  {' '}
                  {getDistance(data.item)}
                  {' '}
                  Km
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      )}
      <View style={styles.statusContainer} />
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

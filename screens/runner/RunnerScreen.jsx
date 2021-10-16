import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import calcCrow from '../../utils/distance';
import {
  clearErrorMessage,
} from '../../store/actions/excercise.actions';
import colors from '../../constants/colors';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export default function RunnerScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const errorMessage = useSelector((state) => state.routines.errorMessage);

  const [currentRunId, setCurrentRunId] = useState(false);
  const [currentCoord, setCurrentCoord] = useState(null);
  const [distance, setDistance] = useState(0);
  const [start, setStart] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setDistance(0);
    }
  }, [isFocused]);

  useEffect(() => {
    if (currentCoord) {
      const { prevLocation, newLocation } = currentCoord;
      setDistance(prevLocation ? distance + calcCrow(prevLocation.coords.latitude,
        prevLocation.coords.longitude,
        newLocation.coords.latitude, newLocation.coords.longitude) : 0);
    } else {
      setDistance(0);
    }
  }, [currentCoord]);

  useEffect(() => {
    if (!start) {
      setCurrentCoord(null);
      setDistance(0);
      setStartTime(null);
    }
  }, [start]);

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permisos insuficientes',
        'Necesita dar permisos de la localización para usar la aplicación',
        [{ text: 'Ok' }],
      );

      return false;
    }
    return true;
  };

  const startRun = async () => {
    setDistance(0);
    const runningId = uuidv4();
    setCurrentRunId(runningId);
    const isLocationOk = await verifyPermissions();
    if (!isLocationOk) return;
    setStart(true);
    setStartTime(moment());
    let currentP = 0;
    TaskManager.defineTask(runningId, async ({ data: { locations } }) => {
      const [location] = locations;
      setCurrentCoord((prevState) => ({
        prevLocation: prevState && prevState.newLocation ? prevState.newLocation : null,
        newLocation: location,
      }));
      await fetch(`${process.env.URL_API}/run/${user.userId}/${runningId}/${currentP}.json?auth=${process.env.API_KEY}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location,
        }),
      });
      currentP += 1;
    });

    Location.startLocationUpdatesAsync(runningId, {
      accuracy: Location.Accuracy.Balanced,
      distanceInterval: 5,
      deferredUpdatesInterval: 10000,
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      },
    });
  };

  const stopRun = () => {
    setStart(false);
    setCurrentCoord(null);
    setDistance(0);
    setStartTime(null);
    Location.hasStartedLocationUpdatesAsync(currentRunId).then((value) => {
      if (value) {
        Location.stopLocationUpdatesAsync(currentRunId);
        navigation.navigate('RunnerList');
      }
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

  const getTimeElapsed = () => {
    const diffTime = moment().diff(startTime);
    const duration = moment.duration(diffTime);
    const hrs = duration.hours();
    const mins = duration.minutes();
    const secs = duration.seconds();

    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Ver mis rutas"
        onPress={() => {
          navigation.navigate('RunnerList');
        }}
      />
      <View style={styles.statusContainer}>
        {start && (
        <TouchableOpacity
          style={{ ...styles.actions, backgroundColor: colors.cancel }}
          onPress={() => stopRun()}
        >
          <Text style={styles.actionText}>Terminar</Text>
        </TouchableOpacity>
        )}
        {!start && (
        <TouchableOpacity
          style={{ ...styles.actions, backgroundColor: colors.cancel }}
          onPress={() => startRun()}
        >
          <Text style={styles.actionText}>Empezar</Text>
        </TouchableOpacity>
        )}
        {start && (
        <View style={styles.statusContainer}>
          <Text>
            Distancia:
            {distance.toFixed(2)}
            {' '}
            Km.
          </Text>
          {startTime && (
          <Text>
            Tiempo transcurrido:
            {getTimeElapsed()}
          </Text>
          )}
        </View>
        )}
      </View>
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

import {
  endRoutine,
  fetchRoutines,
  finishUnfinishedActivities,
  insertRoutine,
} from '../../db';

import moment from 'moment';

export const SELECT_ROUTINE = 'SELECT_ROUTINE';
export const ROUTINE_ADDED = 'ROUTINE_ADDED';
export const REMOVE_ROUTINE = 'REMOVE_ROUTINE';
export const ROUTINE_FAILED = 'ROUTINE_FAILED';
export const ROUTINE_LOADING = 'ROUTINE_LOADING';
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';
export const FILL_ROUTINES = 'FILL_ROUTINES';
export const GET_ROUTINES = 'GET_ROUTINES';
export const MODIFY_USERS = 'MODIFY_USERS';
export const FILL_MY_ROUTINES = 'FILL_MY_ROUTINES';
export const ACTIVITY_LOADING = 'ACTIVITY_LOADING';
export const ACTIVITY_SUCCESS = 'ACTIVITY_SUCCESS';
export const ACTIVITY_FAILED = 'ACTIVITY_FAILED';
export const FILL_ACTIVITIES = 'FILL_ACTIVITIES';
export const ACTIVITY_END = 'ACTIVITY_END';
const { URL_API } = process.env;

export const selectRoutine = (routine) => ({
  type: SELECT_ROUTINE,
  routine,
});

export const getRoutines = () => async (dispatch) => {
  dispatch({
    type: ROUTINE_LOADING,
  });
  const response = await fetch(`${URL_API}/routines.json?auth=${process.env.API_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const result = await response.json();
    const list = Object.keys(result || []).map((key) => ({
      ...result[key],
      id: key,
    }));
    dispatch({
      type: FILL_ROUTINES,
      list,
    });
  } else {
    dispatch({
      type: ROUTINE_FAILED,
      errorMessage: 'No se pudo cargar las rutinas',
    });
  }
};

export const getMyRoutines = (user) => async (dispatch) => {
  dispatch({
    type: ROUTINE_LOADING,
  });
  const response = await fetch(`${URL_API}/routines.json?auth=${process.env.API_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const result = await response.json();
    const list = Object.keys(result || []).map((key) => ({
      ...result[key],
      id: key,
    })).filter((k) => k.users && k.users.includes(user.userId));

    dispatch({
      type: FILL_MY_ROUTINES,
      list,
    });
  } else {
    dispatch({
      type: ROUTINE_FAILED,
      errorMessage: 'No se pudo cargar las rutinas',
    });
  }
};

export const addRoutine = (routine) => async (dispatch) => {
  dispatch({
    type: ROUTINE_LOADING,
  });
  const response = await fetch(`${URL_API}/routines/${routine.id}.json?auth=${process.env.API_KEY}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: Date.now(),
      ...routine,
    }),
  });
  if (response.ok) {
    dispatch({
      type: ROUTINE_ADDED,
      routine,
      isLoading: false,
    });
  } else {
    dispatch({
      type: ROUTINE_FAILED,
      errorMessage: 'No se ha podido guardar el ejercicio',
    });
  }
};

export const removeRoutine = (id) => async (dispatch) => {
  dispatch({
    type: ROUTINE_LOADING,
  });
  const response = await fetch(`${URL_API}/routines/${id}.json?auth=${process.env.API_KEY}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    dispatch({
      type: REMOVE_ROUTINE,
      id,
      isLoading: false,
    });
  } else {
    dispatch({
      type: ROUTINE_FAILED,
      errorMessage: 'No se ha podido borrar el ejercicio',
    });
  }
};

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR_MESSAGE,
});

export const updateUsers = (routine) => async (dispatch) => {
  dispatch({
    type: ROUTINE_LOADING,
  });
  const response = await fetch(`${URL_API}/routines/${routine.id}.json?auth=${process.env.API_KEY}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: Date.now(),
      ...routine,
    }),
  });
  if (response.ok) {
    dispatch({
      type: MODIFY_USERS,
    });
  } else {
    dispatch({
      type: ROUTINE_FAILED,
      errorMessage: 'No se ha podido guardar el ejercicio',
    });
  }
};

export const startActivity = (routine, user) => async (dispatch) => {
  dispatch({
    type: ACTIVITY_LOADING,
  });
  try {
    const timestamp = moment().unix();
    await finishUnfinishedActivities();
    const result = await insertRoutine(routine.id, user.userId, timestamp);
    dispatch({
      type: ACTIVITY_SUCCESS,
      payload: {
        id: result.insertId,
        startTime: timestamp,
      },
    });
  } catch (e) {
    dispatch({
      type: ACTIVITY_FAILED,
      errorMessage: 'No se ha podido guardar el ejercicio',
    });
  }
};

export const getRoutinesActivities = (user) => async (dispatch) => {
  dispatch({
    type: ACTIVITY_LOADING,
  });
  try {
    await finishUnfinishedActivities();
    const res = await fetchRoutines(user.userId);
    dispatch({
      type: FILL_ACTIVITIES,
      payload: {
        activities: res.rows._array,
      },
    });
  } catch (e) {
    dispatch({
      type: ACTIVITY_FAILED,
      errorMessage: 'No se ha podido guardar el ejercicio',
    });
  }
};

export const endActivity = (activityId) => async (dispatch) => {
  dispatch({
    type: ACTIVITY_LOADING,
  });
  try {
    const timestamp = moment().unix();
    await endRoutine(activityId, timestamp);
    dispatch({
      type: ACTIVITY_END,
      payload: {
        endTime: timestamp,
      },
    });
  } catch (e) {
    dispatch({
      type: ACTIVITY_FAILED,
      errorMessage: 'No se ha podido guardar el ejercicio',
    });
  }
};

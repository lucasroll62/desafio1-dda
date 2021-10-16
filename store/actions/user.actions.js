export const SELECT_USER = 'SELECT_USER';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const GET_USERS = 'GET_USERS';
export const USERS_LOADING = 'USERS_LOADING';
export const FILL_USERS = 'FILL_USERS';
export const USERS_FAILED = 'USERS_FAILED';
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_START = 'UPDATE_START';
const { URL_API } = process.env;

export const selectUser = (user) => ({
  type: SELECT_USER,
  user,
});

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const removeUser = (id) => async (dispatch) => {
  dispatch({
    type: USERS_LOADING,
  });
  const response = await fetch(`${URL_API}/users/${id}.json?auth=${process.env.API_KEY}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      active: false,
    }),
  });
  if (response.ok) {
    dispatch({
      type: REMOVE_USER,
      id,
      isLoading: false,
    });
  } else {
    dispatch({
      type: USERS_FAILED,
      errorMessage: 'No se ha podido borrar el usuario',
    });
  }
};

export const updateUser = (user) => async (dispatch) => {
  dispatch({
    type: UPDATE_START,
    success: false,
  });
  const response = await fetch(`${URL_API}/users/${user.userId}.json?auth=${process.env.API_KEY}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      lastName: user.lastName,
      age: user.age,
    }),
  });
  if (response.ok) {
    dispatch({
      type: UPDATE_SUCCESS,
    });
  } else {
    dispatch({
      type: USERS_FAILED,
      errorMessage: 'No se ha podido borrar el usuario',
    });
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({
    type: USERS_LOADING,
  });
  const response = await fetch(`${URL_API}/users.json?auth=${process.env.API_KEY}`, {
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
      type: FILL_USERS,
      list: list.filter((key) => key.active),
    });
  } else {
    dispatch({
      type: USERS_FAILED,
      errorMessage: 'No se pudo cargar los usuarios',
    });
  }
};

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR_MESSAGE,
});

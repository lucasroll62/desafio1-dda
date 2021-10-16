import getAuthUrlByType from '../../constants/database';

const { URL_API } = process.env;
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const LOGOUT = 'LOGOUT';
export const USER_UPDATED = 'USER_UPDATED';

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUserData = (user) => ({
  type: USER_UPDATED,
  user,
});

export const signup = (email, password) => async (dispatch) => {
  const response = await fetch(getAuthUrlByType('signUp'), {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    const errorID = errorResponse.error.message;

    let message = 'No se ha podido registrar';
    if (errorID === 'EMAIL_EXISTS') message = 'Este email ya está registrado';

    throw new Error(message);
  }

  const data = await response.json();

  await fetch(`${URL_API}/users/${data.localId}.json?auth=${process.env.API_KEY}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: Date.now(),
      email,
      role: 'USER',
      active: true,
    }),
  });

  dispatch({
    type: SIGNUP,
    user: {
      role: 'USER',
      token: data.idToken,
      userId: data.localId,
      email,
    },
  });
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch(getAuthUrlByType('signInWithPassword'), {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    const errorID = errorResponse.error.message;

    if (errorID === 'EMAIL_NOT_FOUND') {
      dispatch({
        type: LOGIN_FAILED,
        message: 'Este email no se encuentra registrado',
      });
      return;
    }

    if (errorID === 'INVALID_PASSWORD') {
      dispatch({
        type: LOGIN_FAILED,
        message: 'Contraseña incorrecta',
      });
      return;
    }

    if (errorID.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
      dispatch({
        type: LOGIN_FAILED,
        message: 'Demasiados intentos, intente luego',
      });
      return;
    }

    dispatch({
      type: LOGIN_FAILED,
      message: 'No se ha podido ingresar',
    });
    return;
  }

  const data = await response.json();

  const usersResponse = await fetch(`${URL_API}/users/${data.localId}.json?auth=${process.env.API_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const usersData = await usersResponse.json();

  dispatch({
    type: LOGIN,
    user: {
      token: data.idToken,
      userId: data.localId,
      ...usersData,
    },
  });
};

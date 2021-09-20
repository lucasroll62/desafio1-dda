import getAuthUrlByType from '../../constants/database';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const LOGOUT = 'LOGOUT';

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const logout = () => ({
  type: LOGOUT,
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

  dispatch({
    type: SIGNUP,
    token: data.idToken,
    userId: data.localId,
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

  dispatch({
    type: LOGIN,
    token: data.idToken,
    userId: data.localId,
  });
};

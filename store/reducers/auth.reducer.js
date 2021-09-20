import {
  CLEAR_MESSAGE,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT,
  SIGNUP,
} from '../actions/auth.action';

const INITIAL_STATE = {
  token: null,
  userId: null,
  message: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOGIN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        message: action.message,
      };
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        userId: null,
        message: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;

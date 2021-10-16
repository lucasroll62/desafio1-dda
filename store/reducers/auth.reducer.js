import {
  CLEAR_MESSAGE,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT,
  SIGNUP,
  USER_UPDATED,
} from '../actions/auth.action';

const INITIAL_STATE = {
  token: null,
  user: null,
  message: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        user: action.user,
      };
    case LOGIN:
      return {
        ...state,
        user: action.user,
      };
    case USER_UPDATED:
      return {
        ...state,
        user: action.user,
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
        user: null,
        message: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;

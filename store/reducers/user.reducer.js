import {
  ADD_USER,
  CLEAR_ERROR_MESSAGE,
  FILL_USERS,
  GET_USERS,
  REMOVE_USER,
  SELECT_USER,
  UPDATE_START,
  UPDATE_SUCCESS,
  USERS_FAILED,
  USERS_LOADING,
} from '../actions/user.actions';

const initialState = {
  list: [],
  selected: {},
  isLoading: false,
  errorMessage: null,
  updateSuccess: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER:
      return {
        ...state,
        selected: action.user,
        updateSuccess: false,
      };
    case ADD_USER:
      return {
        list: [...state.list,
          action.user,
        ],
        selected: {},
        updateSuccess: false,
      };
    case REMOVE_USER:
      return {
        list: state.list.filter((item) => item.id !== action.id),
        selected: {},
      };
    case GET_USERS:
      return {
        ...state,
        updateSuccess: false,
      };
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        updateSuccess: false,
      };
    case FILL_USERS:
      return {
        ...state,
        list: action.list,
        isLoading: false,
        updateSuccess: false,
      };
    case USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        updateSuccess: false,
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        updateSuccess: false,
      };
    case UPDATE_START: {
      return {
        ...state,
        updateSuccess: false,
      };
    }
    case UPDATE_SUCCESS: {
      return {
        ...state,
        updateSuccess: true,
        isLoading: false,
        errorMessage: null,
      };
    }
    default:
      return state;
  }
};

export default UserReducer;

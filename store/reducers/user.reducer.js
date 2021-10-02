import {
  ADD_USER,
  CLEAR_ERROR_MESSAGE,
  FILL_USERS,
  GET_USERS,
  REMOVE_USER,
  SELECT_USER,
  USERS_FAILED,
  USERS_LOADING,
} from '../actions/user.actions';

const initialState = {
  list: [],
  selected: {},
  isLoading: false,
  errorMessage: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER:
      return {
        ...state,
        selected: action.user,
      };
    case ADD_USER:
      return {
        list: [...state.list,
          action.user,
        ],
        selected: {},
      };
    case REMOVE_USER:
      return {
        list: state.list.filter((item) => item.id !== action.id),
        selected: {},
      };
    case GET_USERS:
      return {
        ...state,
      };
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FILL_USERS:
      return {
        ...state,
        list: action.list,
        isLoading: false,
      };
    case USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default UserReducer;

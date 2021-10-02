import {
  CLEAR_ERROR_MESSAGE,
  EXCERCISE_ADDED,
  EXCERCISE_LOADING,
  FILL_EXCERCISES,
  GET_EXCERCISES,
  REMOVE_EXCERCISE,
  SELECT_EXCERCISE,
} from '../actions/excercise.actions';

const initialState = {
  list: [],
  selected: {},
  isLoading: false,
  errorMessage: null,
};

const ExcerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_EXCERCISE:
      return {
        ...state,
        selected: action.excercise,
      };
    case EXCERCISE_ADDED:
      return {
        list: [
          ...state.list,
          action.excercise,
        ],
        selected: {},
      };
    case REMOVE_EXCERCISE:
      return {
        list: state.list.filter((item) => item.id !== action.id),
        selected: {},
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
      };
    case EXCERCISE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_EXCERCISES:
      return {
        ...state,
      };
    case FILL_EXCERCISES:
      return {
        ...state,
        list: action.list,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default ExcerciseReducer;

import {
  CLEAR_ERROR_MESSAGE,
  FILL_RUNS,
  GET_RUNS,
  RUNS_FAILED,
  RUNS_LOADING,
  SELECT_RUN,
} from '../actions/runner.actions';

const initialState = {
  list: [],
  selected: {},
  isLoading: false,
  errorMessage: null,
};

const RunReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_RUN:
      return {
        ...state,
        selected: action.run,
      };
    case GET_RUNS:
      return {
        ...state,
      };
    case RUNS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FILL_RUNS:
      return {
        ...state,
        list: action.list.sort((a, b) => a[0].location.coords.timestamp
        < b[0].location.coords.timestamp),
        isLoading: false,
      };
    case RUNS_FAILED:
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

export default RunReducer;

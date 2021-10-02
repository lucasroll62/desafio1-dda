import {
  ACTIVITY_END,
  ACTIVITY_LOADING,
  ACTIVITY_SUCCESS,
  CLEAR_ERROR_MESSAGE,
  FILL_ACTIVITIES,
  FILL_MY_ROUTINES,
  FILL_ROUTINES,
  GET_ROUTINES,
  MODIFY_USERS,
  REMOVE_ROUTINE,
  ROUTINE_ADDED,
  ROUTINE_LOADING,
  SELECT_ROUTINE,
} from '../actions/routine.actions';

const initialState = {
  list: [],
  selected: {},
  isLoading: false,
  errorMessage: null,
  addSuccess: false,
  activitySuccess: false,
  activityEnd: false,
  currentActivity: null,
  listActivities: [],
};

const RoutinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ROUTINE:
      return {
        ...state,
        selected: action.routine,
      };
    case ROUTINE_ADDED:
      return {
        list: [
          ...state.list,
          action.routine,
        ],
        selected: {},
        addSuccess: true,
      };
    case REMOVE_ROUTINE:
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
    case ROUTINE_LOADING:
      return {
        ...state,
        isLoading: true,
        addSuccess: false,
      };
    case GET_ROUTINES:
      return {
        ...state,
      };
    case FILL_ROUTINES:
      return {
        ...state,
        list: action.list,
        isLoading: false,
      };
    case FILL_MY_ROUTINES:
      return {
        ...state,
        list: action.list,
        isLoading: false,
      };
    case MODIFY_USERS:
      return {
        ...state,
        selected: {},
        isLoading: false,
        addSuccess: true,
      };
    case ACTIVITY_LOADING:
      return {
        ...state,
        isLoading: true,
        activitySuccess: false,
        currentActivity: null,
      };
    case ACTIVITY_SUCCESS:
      return {
        currentActivity: {
          ...action.payload,
          currentRoutine: { ...state.selected },
        },
        activitySuccess: true,
        activityEnd: false,
      };
    case ACTIVITY_END:
      return {
        currentActivity: null,
        activitySuccess: false,
        activityEnd: true,
      };
    case FILL_ACTIVITIES:
      return {
        ...state,
        listActivities: action.payload.activities,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default RoutinesReducer;

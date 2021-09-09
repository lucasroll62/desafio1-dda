import { ADD_EXCERCISE, REMOVE_EXCERCISE, SELECT_EXCERCISE } from '../actions/excercise.actions';

const initialState = {
  list: [],
  selected: {},
};

const ExcerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_EXCERCISE:
      return {
        ...state,
        selected: action.excercise,
      };
    case ADD_EXCERCISE:
      return {
        list: [...state.list,
          action.excercise,
        ],
        selected: {},
      };
    case REMOVE_EXCERCISE:
      return {
        list: state.list.filter((item) => item.id !== action.id),
        selected: {},
      };
    default:
      return state;
  }
};

export default ExcerciseReducer;

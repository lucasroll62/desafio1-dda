import { ADD_USER, REMOVE_USER, SELECT_USER } from '../actions/user.actions';

const initialState = {
  list: [],
  selected: {},
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
    default:
      return state;
  }
};

export default UserReducer;

import { ADD_CATEGORY, REMOVE_CATEGORY, SELECT_CATEGORY } from '../actions/category.actions';

const initialState = {
  list: [],
  selected: {},
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        selected: action.category,
      };
    case ADD_CATEGORY:
      return {
        list: [...state.list,
          action.category,
        ],
        selected: {},
      };
    case REMOVE_CATEGORY:
      return {
        list: state.list.filter((item) => item.id !== action.id),
        selected: {},
      };
    default:
      return state;
  }
};

export default CategoryReducer;

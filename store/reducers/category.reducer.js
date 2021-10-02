import {
  CATEGORY_ADDED,
  CATEGORY_FAILED,
  CATEGORY_LOADING,
  CLEAR_ERROR_MESSAGE,
  FILL_CATEGORIES,
  GET_CATEGORIES,
  REMOVE_CATEGORY,
  SELECT_CATEGORY,
} from '../actions/category.actions';

const initialState = {
  list: [],
  selected: {},
  isLoading: false,
  errorMessage: null,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        selected: action.category,
      };
    case CATEGORY_ADDED:
      return {
        list: [...state.list,
          action.category,
        ],
        selected: {},
        isLoading: false,
      };
    case REMOVE_CATEGORY:
      return {
        list: state.list.filter((item) => item.id !== action.id),
        selected: {},
      };
    case CATEGORY_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORY_FAILED:
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
    case GET_CATEGORIES:
      return {
        ...state,
      };
    case FILL_CATEGORIES:
      return {
        ...state,
        list: action.list,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default CategoryReducer;

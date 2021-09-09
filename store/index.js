import { combineReducers, createStore } from 'redux';

import CategoryReducer from './reducers/category.reducer';
import ExcerciseReducer from './reducers/excercise.reducer';
import UserReducer from './reducers/user.reducer';

const RootReducer = combineReducers({
  categories: CategoryReducer,
  excercises: ExcerciseReducer,
  users: UserReducer,
});

export default createStore(RootReducer);

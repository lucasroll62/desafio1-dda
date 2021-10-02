import { applyMiddleware, combineReducers, createStore } from 'redux';

import AuthReducer from './reducers/auth.reducer';
import CategoryReducer from './reducers/category.reducer';
import ExcerciseReducer from './reducers/excercise.reducer';
import RoutinesReducer from './reducers/routine.reducer';
import UserReducer from './reducers/user.reducer';
import thunk from 'redux-thunk';

const RootReducer = combineReducers({
  categories: CategoryReducer,
  excercises: ExcerciseReducer,
  users: UserReducer,
  auth: AuthReducer,
  routines: RoutinesReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));

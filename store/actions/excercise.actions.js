export const SELECT_EXCERCISE = 'SELECT_EXCERCISE';
export const ADD_EXCERCISE = 'ADD_EXCERCISE';
export const REMOVE_EXCERCISE = 'REMOVE_EXCERCISE';

export const selectExcercise = (excercise) => ({
  type: SELECT_EXCERCISE,
  excercise,
});

export const addExcercise = (excercise) => ({
  type: ADD_EXCERCISE,
  excercise,
});

export const removeExcercise = (id) => ({
  type: REMOVE_EXCERCISE,
  id,
});

export const SELECT_USER = 'SELECT_USER';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const selectUser = (user) => ({
  type: SELECT_USER,
  user,
});

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const removeUser = (id) => ({
  type: REMOVE_USER,
  id,
});

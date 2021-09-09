export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category,
});

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  category,
});

export const removeCategory = (id) => ({
  type: REMOVE_CATEGORY,
  id,
});

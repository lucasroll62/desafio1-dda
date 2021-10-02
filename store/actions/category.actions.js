export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const CATEGORY_ADDED = 'CATEGORY_ADDED';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const CATEGORY_FAILED = 'CATEGORY_FAILED';
export const CATEGORY_LOADING = 'CATEGORY_LOADING';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';
export const FILL_CATEGORIES = 'FILL_CATEGORIES';
const { URL_API } = process.env;

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_LOADING,
  });
  const response = await fetch(`${URL_API}/categories.json?auth=${process.env.API_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const result = await response.json();
    const list = Object.keys(result || []).map((key) => ({
      ...result[key],
      id: key,
    }));
    dispatch({
      type: FILL_CATEGORIES,
      list,
    });
  } else {
    dispatch({
      type: CATEGORY_FAILED,
      errorMessage: 'No se pudo cargar las categorias',
    });
  }
};

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category,
});

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR_MESSAGE,
});

export const addCategory = (category) => async (dispatch) => {
  dispatch({
    type: CATEGORY_LOADING,
  });
  const response = await fetch(`${URL_API}/categories/${category.id}.json?auth=${process.env.API_KEY}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: Date.now(),
      name: category.name,
    }),
  });
  if (response.ok) {
    dispatch({
      type: CATEGORY_ADDED,
      category,
      isLoading: false,
    });
  } else {
    dispatch({
      type: CATEGORY_FAILED,
      errorMessage: 'No se ha podido guardar la categoria',
    });
  }
};

export const removeCategory = (categoryId) => async (dispatch) => {
  dispatch({
    type: CATEGORY_LOADING,
  });
  const response = await fetch(`${URL_API}/categories/${categoryId}.json?auth=${process.env.API_KEY}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    dispatch({
      type: REMOVE_CATEGORY,
      id: categoryId,
      isLoading: false,
    });
  } else {
    dispatch({
      type: CATEGORY_FAILED,
      errorMessage: 'No se ha podido borrar la categoria',
    });
  }
};

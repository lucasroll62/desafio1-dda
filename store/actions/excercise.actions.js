export const SELECT_EXCERCISE = 'SELECT_EXCERCISE';
export const EXCERCISE_ADDED = 'EXCERCISE_ADDED';
export const REMOVE_EXCERCISE = 'REMOVE_EXCERCISE';
export const EXCERCISE_FAILED = 'EXCERCISE_FAILED';
export const EXCERCISE_LOADING = 'EXCERCISE_LOADING';
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';
export const FILL_EXCERCISES = 'FILL_EXCERCISES';
export const GET_EXCERCISES = 'GET_EXCERCISES';
const { URL_API } = process.env;

export const selectExcercise = (excercise) => ({
  type: SELECT_EXCERCISE,
  excercise,
});

export const getExcercises = () => async (dispatch) => {
  dispatch({
    type: EXCERCISE_LOADING,
  });
  const response = await fetch(`${URL_API}/excercises.json?auth=${process.env.API_KEY}`, {
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
      type: FILL_EXCERCISES,
      list,
    });
  } else {
    dispatch({
      type: EXCERCISE_FAILED,
      errorMessage: 'No se pudo cargar las categorias',
    });
  }
};

export const addExcercise = (excercise) => async (dispatch) => {
  dispatch({
    type: EXCERCISE_LOADING,
  });
  const response = await fetch(`${URL_API}/excercises/${excercise.id}.json?auth=${process.env.API_KEY}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: Date.now(),
      name: excercise.name,
      categoryId: excercise.categoryId,
    }),
  });
  if (response.ok) {
    dispatch({
      type: EXCERCISE_ADDED,
      excercise,
      isLoading: false,
    });
  } else {
    dispatch({
      type: EXCERCISE_FAILED,
      errorMessage: 'No se ha podido guardar el ejercicio',
    });
  }
};

export const removeExcercise = (id) => async (dispatch) => {
  dispatch({
    type: EXCERCISE_LOADING,
  });
  const response = await fetch(`${URL_API}/excercises/${id}.json?auth=${process.env.API_KEY}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    dispatch({
      type: REMOVE_EXCERCISE,
      id,
      isLoading: false,
    });
  } else {
    dispatch({
      type: EXCERCISE_FAILED,
      errorMessage: 'No se ha podido borrar el ejercicio',
    });
  }
};

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR_MESSAGE,
});

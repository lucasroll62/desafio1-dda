export const SELECT_RUN = 'SELECT_RUN';
export const GET_RUNS = 'GET_RUNS';
export const RUNS_LOADING = 'RUNS_LOADING';
export const FILL_RUNS = 'FILL_RUNS';
export const RUNS_FAILED = 'RUNS_FAILED';
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';
const { URL_API } = process.env;

export const selectRun = (run) => ({
  type: SELECT_RUN,
  run,
});

export const getRuns = (user) => async (dispatch) => {
  dispatch({
    type: RUNS_LOADING,
  });
  const response = await fetch(`${URL_API}/run/${user.userId}.json?auth=${process.env.API_KEY}`, {
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
      type: FILL_RUNS,
      list,
    });
  } else {
    dispatch({
      type: RUNS_FAILED,
      errorMessage: 'No se pudo cargar los usuarios',
    });
  }
};

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR_MESSAGE,
});

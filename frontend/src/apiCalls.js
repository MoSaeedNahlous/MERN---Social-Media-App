import axios from 'axios';

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const { data } = await axios.post('/auth/login', userCredentials);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: data,
    });
    localStorage.setItem(
      'token',data.token
    );
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: error,
    });
  }
};

export const loadUserCall = async (dispatch) => {
  dispatch({ type: 'LOAD_REQUEST' });
  try {
    const { data } = await axios.post('/auth/load', {
      Headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }
    });
    dispatch({
      type: 'LOAD_SUCCESS',
      payload: data.user,
    });

  } catch (error) {
    dispatch({
      type: 'LOAD_FAIL',
      payload: error,
    });
  }
};

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
      'user',
      JSON.stringify({
        _id: data._id,
        username: data.username,
        email: data.email,
        profilePic: data.profilePic,
        coverPic: data.coverPic,
        isAdmin: data.isAdmin,
      })
    );
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: error,
    });
  }
};

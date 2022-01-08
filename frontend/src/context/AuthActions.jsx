export const LoginRequest = (userCredentials) => ({
  type: 'LOGIN_REQUEST',
});

export const LoginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const LoginFail = (error) => ({
  type: 'LOGIN_FAIL',
  payload: error,
});

export const Follow = (userId) => ({
  type: 'FOLLOW',
  payload: userId,
});

export const UnFollow = (userId) => ({
  type: 'UNFOLLOW',
  payload: userId,
});

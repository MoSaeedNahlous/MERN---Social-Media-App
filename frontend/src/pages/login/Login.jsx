import React, { useContext, useRef } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';

const Login = () => {
  const { user, isLoading, error, dispatch } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    console.log(user);
    console.log(error);
  };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Syrian Social Network</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you!
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={onSubmitHandler}>
            <input
              type='email'
              ref={email}
              className='loginInput'
              placeholder='Email'
              required
            />
            <input
              type='password'
              ref={password}
              className='loginInput'
              placeholder='Password'
              required
            />
            <button type='submit' className='loginButton' disabled={isLoading}>
              {isLoading ? (
                <CircularProgress
                  size='25px'
                  thickness={6}
                  color={'secondary'}
                />
              ) : (
                'Log In'
              )}
            </button>
            <span className='loginForgot'>Forgot Your Password?</span>
            <button className='loginRegisterButton' disabled={isLoading}>
              {isLoading ? (
                <CircularProgress
                  size='25px'
                  thickness={6}
                  color={'secondary'}
                />
              ) : (
                'Create a New Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useRef } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import {useHistory} from 'react-router-dom'

const Login = () => {
  const {isLoading,dispatch } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();
  const history = useHistory()
  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
                  color={'white'}
                />
              ) : (
                'Log In'
              )}
            </button>
            <span className='loginForgot'>Forgot Your Password?</span>
            <button
              className='loginRegisterButton'
              type='button'
              disabled={ isLoading }
              onClick={ () => history.push('/register') }
            >
              {isLoading ? (
                <CircularProgress
                  size='25px'
                  thickness={6}
                  color={'white'}
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

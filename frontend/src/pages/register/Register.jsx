import axios from 'axios';
import React from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import GoogleIcon from '@mui/icons-material/Google';
import './register.css';

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      password.current.setCustomValidity('Password don`t match!');
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };
      try {
        await axios.post('/auth/register', user);
        history.push('/login');
      } catch (err) {
        console.error(err);
      }
    }
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
          <form onSubmit={onSubmitHandler} className='loginBox'>
            <input
              required
              type='text'
              ref={username}
              className='loginInput'
              placeholder='Username'
            />
            <input
              required
              type='email'
              ref={email}
              className='loginInput'
              placeholder='Email'
            />
            <input
              required
              type='password'
              ref={password}
              className='loginInput'
              placeholder='Password'
              minLength={6}
            />
            <input
              required
              ref={passwordAgain}
              type='password'
              className='loginInput'
              placeholder='Password Again'
              minLength={6}
            />
            <button type='submit' className='loginButton'>
              Sign Up
            </button>
            <div className="or-wrapper">
              <span className='or'> OR </span>
            </div>
            
            <button className='loginButton google' type='button'> Signup with Google <GoogleIcon className='googleIcon' /> </button>
            <button className='loginRegisterButton' type='button' onClick={()=>{history.push('/login')}}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

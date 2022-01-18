import axios from 'axios';
import { useContext, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PermMedia, Cancel } from '@material-ui/icons';
import { useState } from 'react';
import './registerContinue.css';
import {AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core';
const RegisterContinue = () => {
  const search = useLocation().search;
  const username = new URLSearchParams(search).get('username');
  const email = new URLSearchParams(search).get('email');
  const profilePic = new URLSearchParams(search).get('profilePic');
  const [emailSt, setEmail] = useState('');
  const [profilePicSt, setProfilePic] = useState(profilePic);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();
  const history = useHistory();
  const [file, setFile] = useState(null);
  const {isLoading,dispatch } = useContext(AuthContext);

  useEffect(() => {
    setEmail(email);
    usernameRef.current = username;
    setProfilePic(profilePic)
  }, [email, username,profilePic]);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_REQUEST' });
    if (passwordRef.current.value !== passwordAgainRef.current.value) {
      passwordRef.current.setCustomValidity('Password don`t match!');
    } else {
      const newUser = {
        profilePic:profilePicSt,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        email: emailSt,
      };
      if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newUser.profilePic = fileName;
      try {
        await axios.post('/upload', data);
        
      } catch (error) {
        console.log(error);
      }
    }
      try {
        await axios.post('/auth/register', newUser);
        dispatch({ type: 'SIGNUP_SUCCESS' });
        history.push('/login');
      } catch (err) {
        console.error(err);
        dispatch({ type: 'SIGNUP_FAIL',payload:err });
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
          <form onSubmit={onSubmitHandler} className='reg-continue'>
            <input
              required
              type='text'
              className='loginInput'
              placeholder='Username'
              ref={ usernameRef }
              defaultValue={username}
            />
            <input
              required
              type='email'
              className='loginInput'
              placeholder='Email'
              value={ email }
              readOnly
            />
            <input
              required
              ref={passwordRef}
              type='password'
              className='loginInput'
              placeholder='Password'
              minLength={6}
            />
            <input
              required
              ref={passwordAgainRef}
              type='password'
              className='loginInput'
              placeholder='Password Again'
              minLength={6}
            />
            <label htmlFor='file' className='shareOption'>
              <PermMedia htmlColor='#2A9D8F' className='shareOptionIcon' />
              <span className='shareOptionText'>
                Upload Your Profile Picture
              </span>
              <input
                id='file'
                style={{ display: 'none' }}
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
                accept='.png,.jepg,.jpg'
                placeholder='Upload Your Profile Picture'
              />
            </label>
          
            <div className='profile-picContainer'>
              <img
                className='profile-pic'
                src={file?URL.createObjectURL(file):profilePicSt}
                alt=''
                width={ 100 }
                height={100}
              />
          {file &&     
              <Cancel
                className='shareCancelImg'
                onClick={() => setFile(null)}
              />}
            </div>
              
            <button type='submit' className='loginButton' disabled={ isLoading }>
              {isLoading ? (
                <CircularProgress
                  size='25px'
                  thickness={6}
                  color={'white'}
                />
              ) : (
                'Continue'
              )}
              
            </button>

            <button
              className='loginRegisterButton'
              type='button'
              onClick={() => {
                history.push('/login');
              } }
              disabled={ isLoading }
            >
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterContinue;

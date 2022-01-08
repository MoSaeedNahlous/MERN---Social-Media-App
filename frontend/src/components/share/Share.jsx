import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import './share.css';
import { AuthContext } from '../../context/AuthContext';
import { useRef } from 'react';
import axios from 'axios';

const Share = () => {
  const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;
      try {
        await axios.post('/upload', data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post('/posts', newPost);
      //bad method to refresh page, i should update state instead
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={
              user.profilePic
                ? PUBLIC_PROFILE + '/' + user.profilePic
                : PUBLIC_PROFILE + '/default/profile.png'
            }
            alt=''
          />
          <input
            type='text'
            placeholder={`What's in your mind ${user.username} ?`}
            className='shareInput'
            ref={desc}
          />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className='shareImgContainer'>
            <img
              className='shareImg'
              src={URL.createObjectURL(file)}
              alt='My post'
            />
            <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
          </div>
        )}
        <form className='shareBottom' onSubmit={onSubmitHandler}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              <PermMedia htmlColor='tomato' className='shareOptionIcon' />
              <span className='shareOptionText'>Photo or Video</span>
              <input
                style={{ display: 'none' }}
                type='file'
                id='file'
                accept='.png,.jepg,.jpg'
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <div className='shareOption'>
              <Label htmlColor='blue' className='shareOptionIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <Room htmlColor='green' className='shareOptionIcon' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotions
                htmlColor='goldenrod'
                className='shareOptionIcon'
              />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>
          <button type='submit' className='shareBtn'>
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;

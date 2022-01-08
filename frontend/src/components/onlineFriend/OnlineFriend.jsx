import React from 'react';
import '../rightbar/rightbar.css';

const OnlineFriend = ({ onlineFriend }) => {
  const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className='rightbarFriend'>
      <div className='rightbarFriendImgContainer'>
        <img
          src={PUBLIC_PROFILE + '/' + onlineFriend.profilePicture}
          alt=''
          className='rightbarFriendImg'
        />
        <span className='rightbarOnline'></span>
      </div>
      <span className='rightbarUsername'>{onlineFriend.username}</span>
    </li>
  );
};

export default OnlineFriend;

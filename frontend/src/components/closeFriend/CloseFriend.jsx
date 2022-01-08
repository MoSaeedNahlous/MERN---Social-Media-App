import React from 'react';

const CloseFriend = ({ closeFriend }) => {
  const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className='sidebarFriend'>
      <img
        className='sidebarFriendImg'
        src={PUBLIC_PROFILE + '/' + closeFriend.profilePicture}
        alt=''
      />
      <span className='sidebarFreindName'>{closeFriend.username}</span>
    </li>
  );
};

export default CloseFriend;

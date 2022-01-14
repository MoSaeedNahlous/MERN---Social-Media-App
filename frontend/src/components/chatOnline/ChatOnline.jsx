import axios from 'axios';
import { useEffect, useState } from 'react';
import './chatOnline.css';
const ChatOnline = ({ onlineUsers1, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
        const res = await axios.get(`/users/${currentId}/friends/`);
        setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers1?.includes(f._id)));
  }, [friends, onlineUsers1]);
  return (
    <div className='chatOnline'>
      {onlineFriends.map((o) => (
        <div className='chatOnlineFriend'>
          <div className='chatOnlineImgContainer'>
            <img
              className='chatOnlineImg'
              src={
                o?.profilePic
                  ? PF + '/' + o.profilePic
                  : PF + '/default/profile.png'
              }
              alt=''
            />
            <div className='chatOnlineBadge'></div>
          </div>
          <span className='chatOnlineName'>{o?.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;

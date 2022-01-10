import './message.css';
import { format } from 'timeago.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Message = ({ own, msg }) => {
  const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);
  const senderId = msg.sender;

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/users?userId=${senderId}`);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [senderId]);

  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img
          className='messageImg'
          src={
            user?.profilePic
              ? `${PUBLIC_PROFILE}/${user?.profilePic}`
              : `${PUBLIC_PROFILE}/default/profile.png`
          }
          alt={`${user?.username}'s img`}
        />
        <p className='messageText'>{msg?.text}</p>
      </div>
      <div className='messageBottom'>{format(msg?.createdAt)}</div>
    </div>
  );
};

export default Message;

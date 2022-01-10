import './conversation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Conversation = ({ conversation, currentUserId }) => {
  const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);
  console.log(conversation.members);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);

    const getUser = async () => {
      try {
        const res = await axios('/users?userId=' + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUserId, conversation]);
  if (!user) {
    return <span>Loading</span>;
  }
  return (
    <div className='conversation'>
      <img
        className='conversationImg'
        src={
          user.profilePic
            ? `${PUBLIC_PROFILE}/${user.profilePic}`
            : `${PUBLIC_PROFILE}/default/profile.png`
        }
        alt={`${user.username}'s img`}
      />
      <span className='conversationName'>{user.username}</span>
    </div>
  );
};

export default Conversation;

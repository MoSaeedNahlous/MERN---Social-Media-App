import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import './messenger.css';
import axios from 'axios';

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [mesaages, setMesaages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await axios.get(`/conversations/${user._id}`);
        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user._id) {
      getConversations();
    }
  }, [user._id]);

  useEffect(() => {
    const getMessages = async (currentChatId) => {
      try {
        const { data } = await axios.get(`/messages/${currentChatId}`);
        setMesaages(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat) {
      getMessages(currentChat._id);
    }
  }, [currentChat]);

  return (
    <>
      <Navbar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input placeholder='Search for friends' className='chatMenuInput' />
            {conversations.map((conv) => (
              <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                <Conversation conversation={conv} currentUserId={user._id} />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {!currentChat ? (
              <span className='noConversationText'>Open a converstaion</span>
            ) : (
              <>
                <div className='chatBoxTop'>
                  {mesaages.map((msg) => (
                    <Message
                      msg={msg}
                      key={msg._id}
                      own={msg.sender === user._id ? true : false}
                    />
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    className='chatMessageInput'
                    placeholder='Message'
                    name=''
                    id=''
                    cols='30'
                    rows='10'
                  ></textarea>
                  <button className='chatSubmitBtn'>Send</button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;

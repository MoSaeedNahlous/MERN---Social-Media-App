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
import { useRef } from 'react';
import { io } from 'socket.io-client';

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef(io('ws://localhost:8900'));

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {});
  }, [user]);

  useEffect(() => {
    socket?.on('welcome event', (message) => {
      console.log(message);
    });
  }, [socket]);

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
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat) {
      getMessages(currentChat._id);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollintoView({
      behavior: 'smooth',
    });
  }, [messages]);

  const onClickHandler = async (e) => {
    e.preventDefault();
    const body = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };
    try {
      const { data } = await axios.post('/messages', body);
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
    setNewMessage('');
  };

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
                  {messages.map((msg) => (
                    <div ref={scrollRef}>
                      <Message
                        msg={msg}
                        key={msg._id}
                        own={msg.sender === user._id ? true : false}
                      />
                    </div>
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    className='chatMessageInput'
                    placeholder='Message'
                    name=''
                    id=''
                    cols='30'
                    rows='10'
                  ></textarea>
                  <button className='chatSubmitBtn' onClick={onClickHandler}>
                    Send
                  </button>
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

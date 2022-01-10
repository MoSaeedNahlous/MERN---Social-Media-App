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
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const socket = useRef();
  const scrollRef = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings?.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await axios.get(`/conversations/${user._id}`);
        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onClickHandler = async (e) => {
    e.preventDefault();
    const body = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const { data } = await axios.post('/messages', body);
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
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
                <Conversation conversation={conv} currentUser={user} />
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
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message msg={m} own={m.sender === user._id} />
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
            {/* { onlineFriends.map((friend) => {
              
            })} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;

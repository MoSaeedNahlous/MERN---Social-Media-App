import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfileTimeline from '../../components/profileTimeline/ProfileTimeline';
import Navbar from '../../components/navbar/Navbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './profile.css';
import { useParams } from 'react-router';

const Profile = () => {
  const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/users?username=${username}`);
      setUser(data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={
                  user.coverPic
                    ? PUBLIC_PROFILE + '/' + user.coverPic
                    : PUBLIC_PROFILE + '/default/cover.jpg'
                }
                alt=''
              />
              <img
                className='profileImg'
                src={
                  user.profilePic
                    ? PUBLIC_PROFILE + '/' + user.profilePic
                    : PUBLIC_PROFILE + '/default/profile.png'
                }
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h2 className='profileUsername'>{user.username}</h2>
              <p className='profileDesc'>{user.desc}</p>
            </div>
          </div>
          <div className='profileRightBottom'>
            <ProfileTimeline username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

import React, { useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './profileTimeline.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ProfileTimeline = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    //#TODO need to not use this component for profile or feed because of
    //loading unwanted posts for a seconds
    const fetchPosts = async () => {
      const { data } = await axios.get(`/posts/profile/${username}`);
      setPosts(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username]);
  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {user && user.username === username ? <Share /> : null}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfileTimeline;

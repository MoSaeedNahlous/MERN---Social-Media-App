import { MoreVert } from '@material-ui/icons';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/users?userId=${post.userId}`);
      setUser(data);
    };
    fetchUser();
  }, [post.userId]);

  const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePic
                    ? PUBLIC_PROFILE + '/' + user.profilePic
                    : PUBLIC_PROFILE + '/default/profile.png'
                }
                alt=''
                className='postProfileImg'
              />
            </Link>
            <span className='postUsername'>
              <Link to={`/profile/${user.username}`}>{user.username}</Link>
            </span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          {post.img && (
            <img
              className='postImg'
              src={PUBLIC_PROFILE + '/' + post.img}
              alt=''
            />
          )}
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='postIcon'
              src={`${PUBLIC_PROFILE}/postIcons/like.svg`}
              onClick={likeHandler}
              alt=''
            />
            <img
              className='postIcon'
              src={`${PUBLIC_PROFILE}/postIcons/love.svg`}
              onClick={likeHandler}
              alt=''
            />
            <span className='postLikeCounter'>{like} People liked it!</span>
          </div>
          <div className='postBottomRight'>
            {/* <div className="postCommentText">{post?.comment} comments</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

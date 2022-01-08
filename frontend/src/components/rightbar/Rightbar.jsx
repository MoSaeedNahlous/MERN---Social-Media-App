import React, { useContext, useEffect } from 'react';
import './rightbar.css';
import { Users } from '../../dummyData';
import OnlineFriend from '../onlineFriend/OnlineFriend';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';

const Rightbar = ({ user }) => {
  const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    if (currentUser && user) {
      setFollowed(currentUser.followings.includes(user?._id));
    }
  }, [currentUser, user]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get('/users/' + user._id + '/friends');
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user && user._id) {
      getFriends();
      // setFollowed(currentUser.followings.includes(user._id));
    }
  }, [user]);

  const onClickHandler = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'UNFOLLOW', payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'FOLLOW', payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };
  return (
    <div className='rightbar'>
      {user
        ? user.username !== currentUser.username && (
            <button className='rightbarFollowBtn' onClick={onClickHandler}>
              {followed ? 'Unfollow' : 'Follow'}
              {followed ? <Remove /> : <Add />}
            </button>
          )
        : null}

      <div className='rightbarWrapper'>
        {!user ? (
          <div className='birthdayContainer'>
            <img
              className='birthdayImg'
              src={`${PUBLIC_PROFILE}/bday.jpg`}
              alt=''
            />
            <span className='birthdayText'>
              <b>User2</b> and <b>3 other friends</b> have a birthday today!
            </span>
          </div>
        ) : (
          <>
            <h4 className='rightbarTitle'>User information</h4>
            <div className='rightbarInfo'>
              {user.city && (
                <div className='rightbarInfoItem'>
                  <span className='rightbarInfoKey'>City:</span>
                  <span className='rightbarInfoValue'>{user.city}</span>
                </div>
              )}
              {user.from && (
                <div className='rightbarInfoItem'>
                  <span className='rightbarInfoKey'>Form:</span>
                  <span className='rightbarInfoValue'>{user.from}</span>
                </div>
              )}
              {user.relationship && (
                <div className='rightbarInfoItem'>
                  <span className='rightbarInfoKey'>Relationship:</span>
                  <span className='rightbarInfoValue'>
                    {user.relationship === 1
                      ? 'Single'
                      : user.relationship === 2
                      ? 'Enaged'
                      : user.relationship === 3
                      ? 'Married'
                      : user.relationship === 4
                      ? 'Sperated'
                      : 'Complicated'}
                  </span>
                </div>
              )}
            </div>
            <h4 className='rightbarTitle'>User friends</h4>
            <div className='rightbarFollowings'>
              {friends.length === 0 ? (
                <p>There is no friends at the moment 😢 </p>
              ) : (
                friends.map((friend) => (
                  <Link
                    to={`/profile/${friend.username}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='rightbarFollowing'>
                      <img
                        src={
                          friend.profilePic
                            ? PUBLIC_PROFILE + '/' + friend.profilePic
                            : PUBLIC_PROFILE + '/default/profile.png'
                        }
                        alt=''
                        className='rightbarFollowingImg'
                      />
                      <span className='rightbarFollowingName'>
                        {friend.username}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </>
        )}
        <img src={`${PUBLIC_PROFILE}/ad.jpg`} alt='' className='rightbarAd' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {Users.map((onlineFriend) => (
            <OnlineFriend onlineFriend={onlineFriend} key={onlineFriend.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;

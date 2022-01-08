import React, { useContext } from 'react';
import './navbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='navbarContainer'>
      <div className='navbarLeft'>
        <Link to='/'>
          <span className='logo'>MERN Social App</span>
        </Link>
      </div>

      <div className='navbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input
            type='text'
            className='searchInput'
            placeholder='Search for Friends,Posts,etc..'
          />
        </div>
      </div>

      <div className='navbarRight'>
        <div className='navbarLinks'>
          <div className='navbarLink'>Homepage</div>
          <div className='navbarLink'>Timeline</div>
        </div>
        <div className='navbarIcons'>
          <div className='navbarIconItem'>
            <Person />
            <span className='navbarIconBadge'>1</span>
          </div>
          <div className='navbarIconItem'>
            <Chat />
            <span className='navbarIconBadge'>1</span>
          </div>
          <div className='navbarIconItem'>
            <Notifications />
            <span className='navbarIconBadge'>1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePic
                ? `${PUBLIC_PROFILE}/${user.profilePic}`
                : `${PUBLIC_PROFILE}/default/profile.png`
            }
            alt='Your Profile Pic'
            className='navbarImg'
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

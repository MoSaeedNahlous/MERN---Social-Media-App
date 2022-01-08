import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import './home.css';
import MainTimeline from '../../components/mainTimeline/MainTimeline';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='homeContainer'>
        <Sidebar />
        <MainTimeline />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;

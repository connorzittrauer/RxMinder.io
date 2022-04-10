import React, {useState, useEffect} from 'react';
import './styles.css'
import APIService from '../components/APIService';
import TimeMonitor from '../components/TimeMonitor';

const Home = () => {
  return (
    <div className='page'>
      <h1>Welcome to your Medication Portal</h1>
      

      <h4>It is currently: <TimeMonitor/></h4>
 
    </div>
  );
};

export default Home;
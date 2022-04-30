import React, {useState, useEffect, useContext} from 'react';
import './styles.css';
import APIService from '../components/APIService';
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";
import Alert from '../components/Alert';

const Home = () => {

  const {currentTime} = useContext(TimeMonitorContext)
  

  return (
    <div className='page hf1' style={{backgroundImage: "url(pexels-anna-shvets-3683056.jpg)", backgroundSize:"3000px 2000px"}}>
      <h1>Welcome to your Medication Portal</h1>
      <h4>It is currently: {currentTime}</h4>
      <Alert></Alert>
    </div>
  );
};

export default Home;
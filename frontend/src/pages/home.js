import React, {useState, useEffect, useContext} from 'react';
import './styles.css'
import APIService from '../components/APIService';
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";

const Home = () => {

  const {currentTime} = useContext(TimeMonitorContext)

  return (
    <div className='page'>
      <h1>Welcome to your Medication Portal</h1>
      <h4>It is currently: {currentTime}</h4>
    </div>
  );
};

export default Home;
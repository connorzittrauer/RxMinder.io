import React, {useState, useEffect} from 'react';
import './styles.css'
import APIService from '../components/APIService';

const Home = () => {

  const [currentTime, setCurrentTime] = useState(0);

  const schedule = require('node-schedule');

  const job = schedule.scheduleJob('* * * * *', function(){

    console.log('A console log');
    getTime();
  });



 
 
    const getTime = () => {
      APIService.CallFetch('/current_time', 'GET')
      .then(data => {
        setCurrentTime(data.time)
      })
      .catch(error=> console.log(error))
  }
    useEffect(() => {
      getTime()
    }, [])
    
  return (
    <div className='page'>
      <h1>Welcome to your Medication Portal</h1>
      <br />
      <h4>Current time: {currentTime}z</h4>
    </div>
  );
};
  
export default Home;
import React, {useState, useEffect} from 'react';
import './styles.css'
import APIService from '../components/APIService';
import TimeMonitor from '../components/TimeMonitor';

const Home = () => {

  const [currentTime, setCurrentTime] = useState(0);


  const schedule = require('node-schedule');
  let firstLoad = true

    const getTime = () => {
      APIService.CallFetch('/current_time', 'GET')
      .then(data => {
        setCurrentTime(data.time)
      })
      .catch(error=> console.log(error))
  }
  //I know its dirty but it works
    useEffect(() => {
      if (firstLoad) {
        getTime()
        firstLoad = false;
      }
      const job = schedule.scheduleJob('*/1 * * * *', function(){
        getTime();
        
      });
    }, [])
    
  return (
    <div className='page'>
      <h1>Welcome to your Medication Portal</h1>
      <br />
      <h4>Current time: {currentTime}</h4>
      <TimeMonitor></TimeMonitor>
    </div>
  );
};
  
export default Home;
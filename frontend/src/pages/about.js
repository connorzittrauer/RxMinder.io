import React, { useState } from "react";
import { useEffect, useContext } from "react";
import APIService from "../components/APIService";
import Alert from '../components/Alert';
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";

const About = () => {

  const schedule = require('node-schedule');
  const {currentTime} = useContext(TimeMonitorContext)
  const [rxTimes, setPrescriptionTimes] = useState([])
 

  const getRxTimes = () => {
    APIService.CallFetch('/times', 'GET')
    .then(data => {
      setPrescriptionTimes(data)
    })
    .catch(error=> console.log(error))
  }
  
  const checkTimes = () => {
    console.log(rxTimes)
    for (let i = 0; i < rxTimes.length; i++){
      console.log(rxTimes[i].time + ' ' + rxTimes[i].meridiem)
      console.log(currentTime)
      console.log((rxTimes[i].time + ' ' + rxTimes[i].meridiem))
    }
  }

   useEffect(() => {
    const job = schedule.scheduleJob('*/1 * * * *', function(){
     getRxTimes()      
    });
    // attempt at solving memory leak error
    return function cleanUp() {
      for (const job in schedule.scheduledJobs) {
        schedule.cancelJob(job)
      }
    }
    
  }, [])  
  // set up a useEffect to watch for state changes if state changes then call checkTimes()
  useEffect(()  => {
    checkTimes()
  }, [rxTimes, rxTimes.length])
  
  return (
  <div className="page">
      <h1>
          We at rxminder.io are dedicated to making sure you take your prescriptions on time. 
      </h1>
    </div>
  );
};
  
export default About;
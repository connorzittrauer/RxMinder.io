import React, { useState } from "react";
import { useEffect, useContext } from "react";
import APIService from "../components/APIService";
import Alert from '../components/Alert';
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";

const About = () => {

  const schedule = require('node-schedule');
  const {currentTime} = useContext(TimeMonitorContext)
  const [rxTimes, getPrescriptionTimes] = useState(0)
 

  const getRxTimes = () => {
    APIService.CallFetch('/times', 'GET')
    .then(data => {
      getPrescriptionTimes(data)
    })
    .then(console.log(rxTimes[0]))
    .catch(error=> console.log(error))
  }

  const checkTimes = () => {
    for (let i = 0; i < rxTimes.length; i++){
      console.log(rxTimes[i].time + ' ' + rxTimes[i].meridiem)
      console.log(currentTime == (rxTimes[i].time + ' ' + rxTimes[i].meridiem))
    }
  }

   useEffect(() => {
    const job = schedule.scheduleJob('*/1 * * * *', function(){
     getRxTimes()      
     checkTimes()
    });
    
  }, [])  
  
  return (
  <div className="page">
      <h1>
          We at rxminder.io are dedicated to making sure you take your prescriptions on time. 
      </h1>
    </div>
  );
};
  
export default About;
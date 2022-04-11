import React, { useState } from "react";
import { useEffect, useContext } from "react";
import APIService from "../components/APIService";
import Alert from '../components/Alert';
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";

const About = () => {

  const schedule = require('node-schedule');
  const {currentTime} = useContext(TimeMonitorContext)
  const [rxTimes, getPrescriptionTimes] = useState([])
  
  const getRxTimes = () => {
    APIService.CallFetch('/times', 'GET')
    .then(data => {
      getPrescriptionTimes(data)
    })

    .catch(error=> console.log(error))
  }

  const buildArray = () => {
    for (let i = 0; i < rxTimes.length; i++){
      console.log(rxTimes[i].time + ' ' + rxTimes[i].meridiem)
    }
  }
  

 //console.log(currentTime == "1:40 pm")
 
  useEffect(() => {

   getRxTimes()
   buildArray()
    // const job = schedule.scheduleJob('*/1 * * * *', function(){
    //   buildArray();
    // });
  }, [])  
  
  return (
  <div className="page">
      <h1>
          We at rxminder.io are dedicated to making sure you take your prescriptions on time. 
          <Alert />
      </h1>
    </div>
  );
};
  
export default About;
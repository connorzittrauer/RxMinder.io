import React, { useState } from "react";
import { useEffect, useContext } from "react";
import APIService from "../components/APIService";
import Alert from '../components/Alert';
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";


const About = () => {

// Keep this commented code below here for possible debugging in the future!

//   #region
 
  // const {currentTime} = useContext(TimeMonitorContext)
  // const [rxTimes, setPrescriptionTimes] = useState([])


  // const getRxTimes = () => {
  //   APIService.CallFetch('/times', 'GET')
  //   .then(data => {
  //     setPrescriptionTimes(data)
  //   })
  //   .catch(error=> console.log(error))
  // }


 
  // const checkTimes = () => {
  //   for (let i = 0; i < rxTimes.length; i++){
  //     console.log("Current time: " + currentTime)
  //     console.log(currentTime === (rxTimes[i].time + ' ' + rxTimes[i].meridiem))
  //     console.log("RX Time:" + rxTimes[i].time)
  //   }  
  // }



  // // set up a useEffect to watch for state changes if state changes then call checkTimes()
  // useEffect(()  => {

  //   getRxTimes()     
  //   checkTimes()

  // }, [currentTime])

//#endregion
  return (
  <div className="page">
      <h1>
          We at rxminder.io are dedicated to making sure you take your prescriptions on time. 
          
      </h1>

      <Alert></Alert>
    </div>
  );
};
  
export default About;
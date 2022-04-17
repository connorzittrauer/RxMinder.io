import {React, useState, useEffect, useContext} from "react";
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";
import { useAlert } from 'react-alert'
import APIService from "./APIService";


const Alert = () => {
  
  const schedule = require('node-schedule');
  const {currentTime} = useContext(TimeMonitorContext)
  const [rxTimes, setPrescriptionTimes] = useState([])
  const [rxName, getPresciptionName] = useState([])
  
  const alert = useAlert()

  const getRxTimes = () => {
    APIService.CallFetch('/times', 'GET')
    .then(data => {
      setPrescriptionTimes(data)
    })
    .catch(error=> console.log(error))
  }
  
   useEffect(() => {
    const job = schedule.scheduleJob('*/1 * * * *', function(){
     getRxTimes()      
    });
  }, [schedule])  


  // set up a useEffect to watch for state changes if state changes then call checkTimes()
  useEffect(()  => {

    const checkTimes = () => {
      for (let i = 0; i < rxTimes.length; i++){

        if (currentTime === (rxTimes[i].time + ' ' + rxTimes[i].meridiem)){
          //here we will eventually pass the RXname to the alert
          alert.show("It is time to take your medication!")
        }
      }
    }
     checkTimes()
   
  }, [currentTime])
  
  return (
    <div></div>
  )
}
  
export default Alert;
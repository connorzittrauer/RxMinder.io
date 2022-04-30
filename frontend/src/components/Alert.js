import React, {useState, useEffect, useContext} from "react";
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";
import { useAlert } from 'react-alert'
import APIService from "./APIService";


const Alert = (props) => {

  const {currentTime} = useContext(TimeMonitorContext)
  const [rxTimes, setPrescriptionTimes] = useState([])
  const alert = useAlert()

  const getRxTimes = () => {
    APIService.CallFetch('/times', 'GET')
    .then(data => {
      setPrescriptionTimes(data)
    })
    .catch(error=> console.log(error))
  }
  
  // const getRxTimes = () => {
  //   APIService.CallFetch(`get-user-prescription-times/${props.userId}`, 'GET')
  //   .then(data => {
  //     setPrescriptionTimes(data)
  //   })
  //   .catch(error=> console.log(error))
  // }

 
  const checkTimes = () => {
    for (let i = 0; i < rxTimes.length; i++){
    
      if (currentTime === (rxTimes[i].time + ' ' + rxTimes[i].meridiem)){
        //here we will eventually pass the RXname to the alert
        alert.show("It is time to take your medication!")
      }
    }  
  }

  
  

  // set up a useEffect to watch for state changes if state changes then call checkTimes()
  useEffect(()  => {

    getRxTimes()     
    checkTimes()

  }, [currentTime])


  
  return (
    <div></div>
  )
}
  
export default Alert;
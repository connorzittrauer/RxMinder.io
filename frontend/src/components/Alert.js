import {React, useState, useEffect, useContext} from "react";
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";
import { useAlert } from 'react-alert'
import APIService from "./APIService";


const TimeMonitor = () => {
  const {currentTime} = useContext(TimeMonitorContext)
  console.log('Inside Alert, from context:', currentTime)
  const alert = useAlert()
  //fetch all of the times, whenever one is equal to the current time, trigger an alert, display the medication to be taken

  //make a call to the time input every minute
  useEffect (() => {
    // alert.show('Oh look, an alert!')
  }, [])

  return (
    <button
      onClick={() => {
        alert.show('Oh look, an alert!')
       
      }}
    >
      Show Alert
    </button>
  )
}
  
export default TimeMonitor;
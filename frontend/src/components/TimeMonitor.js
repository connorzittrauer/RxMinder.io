import {React, useState, useEffect} from "react";
import { useAlert } from 'react-alert'
import APIService from "./APIService";

const TimeMonitor = () => {

  const alert = useAlert()
  const [currentTime, getCurrentTime] = useState(0);
  //fetch all of the times, whenever one is equal to the current time in the database, trigger an alert, display the medication to be taken

  //make a call to the time input every minute

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
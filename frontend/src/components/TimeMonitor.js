import {React, useState} from "react";
import { useAlert } from 'react-alert'

const TimeMonitor = () => {

  const alert = useAlert()
  //fetch all of the times, whenever one is equal to the current time, trigger an alert
  

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
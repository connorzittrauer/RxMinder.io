import React, { useState, useEffect, createContext } from "react";
import APIService from "../components/APIService";
export const TimeMonitorContext = createContext(null)
const TimeMonitorProvider = ({children}) => {
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
      <TimeMonitorContext.Provider value={{currentTime}}>
        {children}
      </TimeMonitorContext.Provider>
    )
}

export default TimeMonitorProvider

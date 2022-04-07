import React from "react";
import { useEffect } from "react";
import TimeMonitor from '../components/TimeMonitor';
const About = () => {
  
  const MINUTE_MS = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every minute');
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  return (
  
  
  <div className="page">
      <h1>
          We at rxminder.io are dedicated to making sure you take your prescriptions on time. 
          <TimeMonitor></TimeMonitor>
      </h1>
    </div>
  );
};
  
export default About;
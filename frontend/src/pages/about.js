import React from "react";
import TimeMonitor from '../components/TimeMonitor';
const About = () => {
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
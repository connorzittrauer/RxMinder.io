import React, { useState } from "react";
import { useEffect, useContext } from "react";
import APIService from "../components/APIService";
import Alert from '../components/Alert';
import { TimeMonitorContext } from "../providers/TimeMonitorProvider";
import "./styles.css";


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
      <div className="aboutContent">
        <h1 className="hf1">About Us</h1>
          <div className="pContainer">
            <h3 className="hf3">What is RxMinder?</h3>
            <p>
              Life can get chaotic at times wouldn’t it be nice to have help remembering to take your pills? 
              RxMinder can be the tool that you have been searching for.
              RxMinder is a web application for keeping track of your daily prescriptions and their dosages. 
              It also keeps track of what time you would like to take them. 
            </p>
          </div> 
          <div className="pContainer">
            <h3 className="hf3">Why use RxMinder?</h3>
            <p>
              1 in 2 people miss a dose, and 1 in 3 forget if they even took the medication. 
              Studies show that as many as 50% of people do not take their medications correctly. 
              From these problems is how RxMinder was born, it will help keep you on track of your medications. 
              We have enough on our minds as it is, let this app help ease some of the burden. 
              We at RxMinder.io are dedicated to making sure you take your prescriptions on time.
            </p>
          </div> 
          <div className="pContainer">
            <h3 className="hf3">About the Authors</h3>
            <p>
              RxMinder is a group effort written by students at Bossier Parish Community College as their capstone project. 
              Authors: Brianna Conly, Walker Ray, Connor Zittrauer.
            </p>
          </div>
      </div>

      <Alert></Alert>
    </div>
  );
};
  
export default About;
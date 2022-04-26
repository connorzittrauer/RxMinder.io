import React, { useState, useEffect } from 'react'
import APIService from './APIService'
import TimeSelector from './TimeSelector';
import './styles.css';

function AddPrescription(props) {
  const [showForm, setFormStatus] = useState(false);

  const viewData = () => setFormStatus(true);

  //these name and dosage variables are retrieved from the input form below and passed to the API service
  const[name, setName] = useState('')
  const[dosage, setDosage] = useState('')
  const[times, setTimes] = useState(['1:00'])
  const[meridiems, setMers] = useState(['am'])
  const[timeCount, setTimeCount] = useState(1)

  const add = () => {
    APIService.CallFetch(`add-user-prescription/${props.userId}`, 'POST', { name, dosage, times, meridiems})
     .then(() => {
       props.refresh()
       setFormStatus(false)
      })
    // .then(console.log(name, dosage))
    .catch(error=> console.log(error))
  }


  const buildTimeSel = () => {
    let timeComponents = []
    for (let i = 0; i < timeCount; i++) {
      timeComponents.push(<TimeSelector key={`sel${i}`} hour='1' min='00' meridiem='am' setTime={t => setTimeIndex(t, i)} setMer={m => setMerIndex(m, i)}/>)
    }
    return timeComponents
  }
  const setTimeIndex = (t, i) => {
    let tempTimes = [...times]
    tempTimes[i] = t
    setTimes(tempTimes)
  }
  const setMerIndex = (m, i) => {
    let tempMers = [...meridiems]
    tempMers[i] = m
    setMers(tempMers)
  }
  const addTime = () => {
    setTimeCount(timeCount + 1) //this only works for primative data
  }



  return (
    <div className='formDiv'>
      <button style={{marginRight: '15px'}} onClick={viewData}>Add New Prescription</button>
      <button style={{marginBottom: '25px'}} onClick={props.reverseOrder}>Reverse Order</button>
      {showForm && (
        <div>
          <input style={{marginRight: '15px'}} onChange={event => setName(event.target.value)} placeholder='prescription name'/>
          <input onChange={event => setDosage(event.target.value)} placeholder='dosage'/>
          {buildTimeSel()}
          <button type="button" onClick={addTime}>Add Time</button>
          <button style={{marginTop: '15px'}} onClick={add} type="button">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
export default AddPrescription;
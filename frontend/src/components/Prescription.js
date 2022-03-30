import React, {useEffect, useState} from 'react'
import "./styles.css";
import PrescriptionButtons from './PrescriptionButtons';
import APIService from './APIService';

function Prescription(props) {
  //states to change name, dose, and view
  const [name, setName] = useState(props.name);
  const [dose, setDose] = useState(props.dosage);
  const [time, setTime] = useState([])
  const [uView, setUView] = useState(false);

  //calls useEffect() to get the time based on the id this happens anytime props.id changes
  useEffect(() => {
    APIService.CallFetch(`times/${props.id}`, 'GET')
    .then((r) => setTime(r))
  }, [props.id])


  //using call fetch to edit a prescription
  const editPrescription = () => {
    let body = {
      name: name, 
      dosage: dose,
      frequency: time,
    }
    APIService.CallFetch(`update/${props.id}`, 'PUT', body)
        .then(() => props.refresh())
        .catch(error=> console.log(error))
  }

    

  //update changes the view and edits the prescription if it is in update view --uView
  const update = () => {
    if (uView) {
      editPrescription()
      setUView(false)
    } else {
      setUView(true)
    }
  }
  //deletes a prescription
  const deleteP = () => {
    APIService.CallFetch(`delete/${props.id}`, 'DELETE')
        .then(() => props.refresh())
        .catch(error=> console.log(error))
  }
  //loops over the time array and builds a string out of the times including am and pm
  const formatTimes = () => {
    let doseTimes = ''
    time.forEach((t,i) => {
      doseTimes += t.time + t.meridiem
      if(i<time.length-1){
        doseTimes += ', '
      }
    })
    return doseTimes
  }
  //this builds the ui
  return (
    <div className="pCard">
      {uView ?
      (<>
        <label>Name:</label>
        <input className="nameField" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Dosage:</label>
        <input className="doseField" value={dose} onChange={(e) => setDose(e.target.value)} />
        <label>Time:</label>
        <input className="timeField" value={time} onChange={(e) => setTime(e.target.value)} />
        <PrescriptionButtons update={update} delete={deleteP} updateOnly={uView} />
      </>):
      (<>
        <p className="cardText">{props.name}: {props.dosage}</p>
        <p>{formatTimes()}</p>
        <PrescriptionButtons update={update} delete={deleteP} updateOnly={uView} />
      </>)}
    </div>
  )
}

export default Prescription
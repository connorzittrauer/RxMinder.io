import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import PrescriptionList from './components/PrescriptionList';
import Form from './components/Form';

function App() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editedPrescription, setEditedPrescription] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      headers: {
        'method':'GET',
        headers:{
          'Content-Type':'application/json'
        }

      }
    })
    .then(resp => resp.json())
    .then(resp => setPrescriptions(resp))
    .catch(error => console.log(error))

  },[])

  const editPrescription = (prescription) => {
    setEditedPrescription(prescription)
  }

  const updatedData = (prescription) => {
    const new_prescription = prescriptions.map(my_prescription =>  {
      if (my_prescription.id === prescription.id) {
        return prescription
      } else {
        return my_prescription
      }
    })
    setPrescriptions(new_prescription)
  } 


  return (
    <div className="App">
        <h1>Example</h1>
        <br/>
        <br/>
        <p>Here is are your prescriptions</p>
        <PrescriptionList prescriptions = {prescriptions} editPrescription = {editPrescription}/>


        {editedPrescription ? <Form prescription = {editedPrescription} updatedData = {updatedData}/> : null}
        
    </div>
  );
}

export default App;
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

  return (
    <div className="App">
        <h1>Example</h1>
        <br/>
        <br/>
        <p>Here is a simple example of displaying data from the database to the front end, served up from the flask back-end</p>
        <PrescriptionList prescriptions = {prescriptions} editPrescription = {editPrescription}/>
        {editedPrescription ? <Form prescription = {editedPrescription}/> : null}
        
    </div>
  );
}

export default App;
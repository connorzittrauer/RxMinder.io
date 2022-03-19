import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [prescriptions, setPrescriptions] = useState([]);

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
  return (
    <div className="App">
        <h1>Example</h1>
      {prescriptions.map(prescription => {
        return (
          <div key = {prescription.id}>
            <h3>{prescription.name}: {prescription.dosage}</h3>
       
          </div>
        )
      })}
    </div>
  );
}

export default App;
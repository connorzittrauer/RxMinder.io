import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setPrescriptions(resp))
    .catch(error => console.log(error))

  },[])
  return (
    <div className="App">
        <h1>Hello</h1>

    </div>
  );
}

export default App;
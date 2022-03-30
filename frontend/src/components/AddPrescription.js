import React, { useState, useEffect } from 'react'
import APIService from './APIService'
import './styles.css';

function AddPrescription(props) {
  const [showForm, setFormStatus] = useState(false);

  const viewData = () => setFormStatus(true);

  //these name and dosage variables are retrieved from the input form below and passed to the API service
  const[name, setName] = useState('')
  const[dosage, setDosage] = useState('')
  const[times, setTime] = useState('')

  const AddPrescription = () => {
      APIService.CallFetch('add', 'POST', { name, dosage })
      .then(() => props.refresh())
      .then(console.log(name, dosage))
      .catch(error=> console.log(error))
  }
  
  return (
    <div className='formDiv'>
      <button style={{marginRight: '15px'}} onClick={viewData}>Add New Prescription</button>
      <button style={{marginBottom: '25px'}} onClick={props.reverseOrder}>Reverse Order</button>
      {showForm && (
        <form>
          <input style={{marginRight: '15px'}} onChange={event => setName(event.target.value)} placeholder='prescription name'/>
          <input onChange={event => setDosage(event.target.value)} placeholder='dosage'/>
          <input style={{marginRight: '15px'}} onChange={event => setTime(event.target.value)} placeholder='when do you take this medication?'/>
          <button style={{marginTop: '15px'}} onClick={AddPrescription} type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
export default AddPrescription;
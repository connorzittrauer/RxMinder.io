import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function AddButton(props) {
const [showForm, setFormStatus] = useState(false);

const viewData = () => setFormStatus(true);

//these name and dosage variables are retrieved from the input form below and passed to the API service
const[name, setName] = useState('')
const[dosage, setDosage] = useState('')


const AddPrescription = () => {
    APIService.AddPrescription({name, dosage})
    .then(resp => props.updatedData(resp))
    .then(console.log(name, dosage))
    .catch(error=> console.log(error))

}
return (
  <div>
    <button onClick={viewData}>Add Another Prescription</button>
    {showForm && (
      <form>
        <input onChange={event => setName(event.target.value)} placeholder='prescription name'/>
        <input onChange={event => setDosage(event.target.value)} placeholder='dosage'/>
        <button 
        onClick={AddPrescription}
        type="submit">submit</button>
      </form>
    )}
  </div>
);
}
export default AddButton
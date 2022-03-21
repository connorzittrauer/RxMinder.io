import React, { useState } from 'react'
import APIService from './APIService'

function Form(props) {
    const[name, setName] = useState(props.prescription.name)
    const[dosage, setDosage] = useState(props.prescription.dosage)

    const updateName = () => {
        APIService.UpdateName(props.prescription.id, {name, dosage})
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    }
  return (
    <div>{props.prescription ? (

        <div className="mb-3">
              
        <label htmlFor="name" className='form-label'>Name</label>
        
        <input type="text" className="form-control"
        value={name}
        placeholder='Please Enter a Name'

        //this updates the information
        onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="dosage" className='form-label'>Dosage</label>
        <textarea
        rows = "1"
        value={dosage}
        className='formlabel'
        placeholder='Please enter a Dosage'
        onChange={(e) => setDosage(e.target.value)}
        />

        <button
        onClick={updateName}
        className='btn-update'
        >Update</button>
        </div>

    ):null}

    </div>
  )
}

export default Form
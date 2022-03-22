import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function Form(props) {
    const[name, setName] = useState('')
    const[dosage, setDosage] = useState('')

    useEffect (() => {
      setName(props.prescription.name)
      setDosage(props.prescription.dosage)
    },[props.prescription])

    const updateName = () => {
      APIService.UpdateName(props.prescription.id, {name, dosage})
      .then(resp => props.updatedData(resp))
      .catch(error=> console.log(error))

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
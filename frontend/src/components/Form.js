import React, { useState } from 'react'

function Form(props) {
    const[name, setName] = useState(props.prescription.name)
    const[dosage, setDosage] = useState(props.prescription.dosage)


  return (
    <div>{props.prescription ? (

        <div className="mb-3">
              
        <label htmlForm="name" className='form-label'>Name</label>
        
        <input type="text" className="form-control"
        value={name}
        placeholder='Please Enter a Name'
        onChange={(e) => setName(e.target.value)}
        />

        <label htmlForm="dosage" className='form-label'>Dosage</label>
        <textarea
        rows = "1"
        value={dosage}
        className='formlabel'
        placeholder='Please enter a Dosage'
        onChange={(e) => setDosage(e.target.value)}
        />
        </div>

    ):null}

    </div>
  )
}

export default Form
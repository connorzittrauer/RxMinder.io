import React, { useState, useEffect } from 'react'
import APIService from './APIService'


function AddButton(props) {
    const[name, setName] = useState('')
    const[dosage, setDosage] = useState('')

    const [open, setIsOpen] = React.useState(false);
    const openForm = () => setIsOpen(true);

    const addPrescription = () => {
        APIService.AddPrescription(props.prescription.id, {name, dosage})
        .then(resp => props.updatedData(resp))
        .catch(error=> console.log(error))
    }
    return(
    <div>
        <button onClick={openForm}> click me! </button>

    </div>
    ) 
}

export default AddButton
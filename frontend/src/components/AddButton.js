import React, { useState, useEffect } from 'react'
import APIService from './APIService'


function AddButton(props) {
  
    // const addPrescription = () => {
    //     APIService.AddPrescription(props.prescription.id, {name, dosage})
    //     .then(resp => props.updatedData(resp))
    //     .catch(error=> console.log(error))
    // }
    return(
    <div>
        <button
        // onClick={addPrescription}
        >Here is a Button</button>
    </div>
    ) 
}

export default AddButton
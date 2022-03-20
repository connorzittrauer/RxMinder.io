import React from 'react'

function PrescriptionList(props) {

  const editPrescription = (prescription) => {
    props.editPrescription(prescription)
  }

  return (
    <div>{props.prescriptions && props.prescriptions.map(prescription => {
        return (
          <div key = {prescription.id}>
            <h3>{prescription.name}: {prescription.dosage}</h3>
            <div className='row'>
              <div className = "col-md-1"
              onClick={() => editPrescription(prescription)}
              
              >
                <button className="btn btn-primary">Update</button>
              </div>
              <div className = "col">
                <button className="btn btn-danger">Delete</button>
                </div>
              </div>
              <hr/>
          </div>
        )
      })}</div>
  )
}

export default PrescriptionList
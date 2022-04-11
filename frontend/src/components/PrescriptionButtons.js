import React from "react";

const PrescriptionButtons = (props) => {
    //doesn't render delete button if in update view
    return (
        <div className="buttonContainer">
            <button className="btn btn-primary" style={{marginRight:"10px"}} onClick={props.update}>Update</button>
            {!props.updateOnly ? 
            <button className="btn btn-danger" onClick={props.delete}>Delete</button> : 
            <>
                <button style={{marginRight:"10px"}} className="btn btn-secondary" onClick={props.addNewTime}>Add Time</button>
                <button className="btn btn-secondary" onClick={props.cancel} >Cancel</button>
            </>
            }
        </div>
    )
}

export default PrescriptionButtons;
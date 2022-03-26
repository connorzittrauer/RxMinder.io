import React from "react";

const PrescriptionButtons = (props) => {
    //doesn't render delete button if in update view
    return (
        <div className="buttonContainer">
            <button className="btn btn-primary" style={{marginRight:"10px"}} onClick={props.update}>Update</button>
            {!props.updateOnly ? <button className="btn btn-danger" onClick={props.delete}>Delete</button> : null}
        </div>
    )
}

export default PrescriptionButtons;
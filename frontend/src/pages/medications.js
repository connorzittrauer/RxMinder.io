import React, { useEffect, useState } from "react";
import APIService from "../components/APIService";
import Prescription from "../components/Prescription";
import AddPrescription from "../components/AddPrescription";
import Alert from "../components/Alert";

const Medications = (props) => {
    /* prescriptions are saved in an array */
    const [prescriptions, setPrescriptions] = useState([])
    
    const getPrescriptions = () => {
        APIService.CallFetch(`get-user-prescriptions/${props.userId}`, 'GET')
        .then(resp => setPrescriptions(resp.reverse())) // saves most recent prescription first
        .catch(error=> console.log(error))
    }


  
    //when component mounts call getPrescriptions
    useEffect(() => {
        getPrescriptions()
    }, [props.userId])

    //build prescription components out of state array
    const renderPrescriptions = () => {
        return (
            prescriptions.map((p, index) =>{
                return <Prescription key={`prescription${index}`} id={p.id} index={index} name={p.name} dosage={p.dosage} refresh={getPrescriptions} />    
            })

        )
    }
    const reverseOrder = () => {
        let clone = [...prescriptions] // must clone as state is read only
        setPrescriptions(clone.reverse())
    }

    return (
        <div>
            <Alert></Alert>
            <AddPrescription refresh={getPrescriptions} reverseOrder={reverseOrder} userId={props.userId}/>
            {renderPrescriptions()}
            
        </div>
    )
}

export default Medications;

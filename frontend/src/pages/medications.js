import React, { useEffect, useState } from "react";
import APIService from "../components/APIService";
import Prescription from "../components/Prescription";
import AddPrescription from "../components/AddPrescription";

const Medications = () => {
    /* prescriptions are saved in an array */
    const [prescriptions, setPrescriptions] = useState([])
    const [times, setTimes] = useState([])

    //making a call to the APIservice
    const getPrescriptions = () => {
        APIService.CallFetch('get', 'GET')
        .then(resp => setPrescriptions(resp)) // most recent first
        .catch(error=> console.log(error))
    }
    


    const getTimes = () => {
        APIService.CallFetch(`times`, 'GET')
        .then(resp => setTimes(resp)) 
        .then(console.log(times[0].time))
        .catch(error => console.log(error))
    }

    
    //when component mounts call getPrescriptions
    useEffect(() => {
        getPrescriptions()
        getTimes()
       
        // getPrescriptionIDs()
    }, [])


    // console.log(prescriptions[0].dosage)
    //build prescription components out of state array
    const renderPrescriptions = () => {
        return (
            prescriptions.map((p, index) =>{
                return <Prescription key={`prescription${index}`}id={p.id} index={index} name={p.name} dosage={p.dosage} frequency={times[0].time} refresh={getPrescriptions} />    
     
            })

        )
    }
    const reverseOrder = () => {
        let clone = [...prescriptions] // must clone as state is read only
        setPrescriptions(clone.reverse())
    }

    return (
        <div>
            <AddPrescription refresh={getPrescriptions} reverseOrder={reverseOrder} />
            {renderPrescriptions()}
        </div>
    )
}

export default Medications;
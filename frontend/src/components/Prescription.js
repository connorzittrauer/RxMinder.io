import React, {useEffect, useState} from 'react'
import "./styles.css";
import PrescriptionButtons from './PrescriptionButtons';
import APIService from './APIService';
import TimeSelector from './TimeSelector';

function Prescription(props) {
  //states to change name, dose, and view
  const [name, setName] = useState(props.name);
  const [dose, setDose] = useState(props.dosage);
  const [time, setTime] = useState([])
  const [uView, setUView] = useState(false);
  const [refreshPrescription, setRefresh] = useState(false)
  // const [timesEdit, setTEdit] = useState([])
  // const [timesAdd, setTAdd] = useState([])

  //removes time from state
  const removeTime = (i) => {
    let tempTimes=[...time]
    tempTimes.splice(i, 1)
    setTime(tempTimes)
  }
  //set name and set dose if props name and dose changes
  useEffect(() => {
    setName(props.name)
    setDose(props.dosage)
  }, [props.name, props.dosage])

  //refreshes the parent
  useEffect(() => {
    props.refresh()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time.length])

  //calls useEffect() to get the time based on the id this happens anytime props.id changes
  useEffect(() => {
    const fetchTimes = () => {
      APIService.CallFetch(`times/${props.id}`, 'GET')
      .then((r) => setTime(r))
    }
    if (!uView) {
      fetchTimes()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id, refreshPrescription, uView])
  
  //using call fetch to edit a prescription
  const editPrescription = () => {
    let body = {
      name: name, 
      dosage: dose,
      frequency: time,
    }
    APIService.CallFetch(`update/${props.id}`, 'PUT', body)
        .then(() => props.refresh())
        .catch(error=> console.log(error))
    let last = time.length-1
    time.forEach((t, i) => {
      if (t.id !== 0) {
        APIService.CallFetch(`updateTime/${t.id}`, 'PUT', {time:t.time, meridiem:t.meridiem})
        .then(() => {
          if (last === i) {
            setRefresh(!refreshPrescription)
          }
        })
        .catch(error=> console.log(error))
      } else {
        APIService.CallFetch(`addTime`, 'POST', {time:t.time, meridiem:t.meridiem, rxid:t.rxid})
        .then(() => {
          if (last === i) {
            setRefresh(!refreshPrescription)
          }
        })
        .catch(error=> console.log(error))
      }
    })
  }

  //update changes the view and edits the prescription if it is in update view --uView
  const update = () => {
    if (uView) {
      editPrescription()
      setUView(false)
    } else {
      setUView(true)
    }
  }
  //deletes a prescription
  const deleteP = () => {
    APIService.CallFetch(`delete/${props.id}`, 'DELETE')
        .then(() => props.refresh())
        .catch(error=> console.log(error))
  }
  //loops over the time array and builds a string out of the times including am and pm
  const formatTimes = () => {
    let doseTimes = ''
    time.forEach((t,i) => {
      doseTimes += t.time + t.meridiem
      if(i<time.length-1){
        doseTimes += ', '
      }
    })
    return doseTimes
  }
  //if id=0 then don't call api remove from state
  const deleteTime = (id, i) => {
    if (id !== 0) {
      APIService.CallFetch(`time/${id}`, 'DELETE')
      .then(() => removeTime(i))
      .catch(error=> console.log(error))
    } else {
      removeTime(i)
    }
  }

  //if id=0 then save new times
  const editTime = (newTime, newMer, id, i, type) => {
    if (time.length > 0 && ((newTime !== time[i].time && !newMer) || (newMer !== time[i].meridiem && !newTime))) {
      let tempTime = [...time]
      tempTime[i] = {
        id,
        time: type === "time" ? newTime : time[i].time,
        meridiem: type === "mer" ? newMer : time[i].meridiem,
        rxid:props.id,
      }
      setTime(tempTime)
    }
  }

  //map time state to timeSelector components
  const renderTimes = () => {
    let timeComponents = time.map((t,i) => {
      let timeR = t.time.split(':')
      return <TimeSelector 
                id={t.id} 
                edit={true} 
                delete={(id) => deleteTime(id, i)} 
                hour={timeR[0]} 
                min={timeR[1]} 
                meridiem={t.meridiem} 
                key={`selector${i}`} 
                setTime={(t, id) => {editTime(t, "", id, i, "time")}} 
                setMer={(m, id) => {editTime("", m, id, i, "mer")}}
             />
    })
    return timeComponents
  }
  //adds a new timeSelector
  const addNewTime = () => {
    let tempTimes = [...time]
    tempTimes.push({id:0, meridiem:"am", rxid:props.id, time:"1:00"})
    setTime(tempTimes)
  }

  //this builds the ui
  return (
    <div className="pCard">
      {uView ?
      (<>
        <label>Name:</label>
        <input className="nameField" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Dosage:</label>
        <input className="doseField" value={dose} onChange={(e) => setDose(e.target.value)} />
        {renderTimes()}
        <PrescriptionButtons addNewTime={addNewTime} cancel={() => setUView(false)} update={update} delete={deleteP} updateOnly={uView} />
      </>):
      (<>
        <p className="cardText">{props.name}: {props.dosage}</p>
        <p>{formatTimes()}</p>
        <PrescriptionButtons update={update} delete={deleteP} updateOnly={uView} />
      </>)}
    </div>
  )
}

export default Prescription
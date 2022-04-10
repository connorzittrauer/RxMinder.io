import React, { useState, useEffect} from 'react'


const TimeSelector = (props) => {
    
    const[hour, setHour] = useState(props.hour)
    const[min, setMin] = useState(props.min)
    const[meridiem, setMer] = useState(props.meridiem)

    useEffect(() => {
        props.setTime(hour + ":" + min, props.id)
        props.setMer(meridiem,  props.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hour, min, meridiem]) // when hour, min, or meridiem change set the time
    
    useEffect(() => {
        setHour(props.hour)
        setMin(props.min)
        setMer(props.meridiem)
    }, [props.hour, props.min, props.meridiem])

    // making opts array of options for hours
    const hourOpts = () => {
        let opts = []
        for(let i = 1; i <= 12; i++) {
            opts.push(<option value={i} key={`hour${i}`}>{i}</option>) // adding a key to components in an array of components makes console quiet-er
        }
        return opts
    }
    // making opts array of options for minutes
    const minOpts = () => {
        let m
        let opts = []
        for(let i = 0; i <= 55; i = i + 5) {
            if(i < 10) {
                m = "0" + i
            } else {
                m = i
            }
            opts.push(<option value={m} key={`min${m}`}>{m}</option>)
        }
        return opts
    }

    return (
        <div style={{marginTop: '10px', marginBottom: '10px'}}>
            <span>Time: </span>
            <select value={hour} onChange={event => setHour(event.target.value)} className="selectTime" name="hour">
                {hourOpts()}
            </select>
            <select value={min} onChange={event => setMin(event.target.value)} className="selectTime" name="minute">
                {minOpts()}
            </select>
            <select value={meridiem} onChange={event => setMer(event.target.value)} className="selMer" name="meridiem">
                <option value="am">AM</option>
                <option value="pm">PM</option>
            </select>
            { props.edit ? (<img style={{marginBottom:"5px"}} alt="" src="./deleteicon.png" onClick={() => props.delete(props.id)}/>): null }
        </div>
    )
}

export default TimeSelector
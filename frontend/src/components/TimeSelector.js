import React, { useState, useEffect} from 'react'

const TimeSelector = (props) => {
    
    const[hour, setHour] = useState(props.hour)
    const[min, setMin] = useState(props.min)
    const[meridiem, setMer] = useState(props.meridiem)
    console.log(props)
    useEffect(() => {
        props.setTime(hour + ":" + min)
        props.setMer(meridiem)
    }, [hour, min, meridiem, props]) // when hour, min, or meridiem change set the time, added props to be watched to get rid of warning

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
        </div>
    )
}

export default TimeSelector
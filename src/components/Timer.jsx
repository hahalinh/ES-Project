import React from 'react'
import Button from './Button'

function Timer({setArrive, setDepart}) {
    return (
        <div className="time-button">
            <Button handleData={setArrive} value="Time arrive - Start" className="time-start"/>
            <Button handleData={setDepart} value="Time depart - End" className="time-end"/>
        </div>
    )
}

export default Timer
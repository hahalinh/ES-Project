import React from 'react'
import Button from './Button'

function Timer({setArrive, setDepart, data}) {
    return (
        <div className="time-button">
            <p>Time arrive: {data.arrive}</p>
            <Button handleData={setArrive} value="Time arrive - Start" className="time-start"/>
            <p>Time depart: {data.depart}</p>
            <Button handleData={setDepart} value="Time depart - End" className="time-end"/>
        </div>
    )
}

export default Timer
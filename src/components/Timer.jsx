import React from 'react'
import DatePicker from "react-datepicker";
import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";

function Timer({setArrive, setDepart, data}) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const handleChangeArrive = (e) => {
        
        setStartDate(e);
        const value = e.toString();
        setArrive(value);
    }
    const handleChangeDepart = (e) => {
        setEndDate(e);
        const value = e.toString();
        setDepart(value);
    }

    return (
        <div className="time-button">
            <p>Time arrive: {data.arrive}</p>
            <DatePicker
                selected={startDate}
                onChange={(e) => handleChangeArrive(e)}              
                showTimeSelect
                timeIntervals={1}
                placeholderText={"No Time Selected"}
                dateFormat={"MM/dd/yyyy h:mm aa"}
            />
            
            
            <p>Time depart: {data.depart}</p>
            <DatePicker
                selected = {endDate}
                onChange={(e) => handleChangeDepart(e)} 
                showTimeSelect
                timeIntervals={1}
                placeholderText={"No Time Selected"}
                dateFormat={"MM/dd/yyyy h:mm aa"}
            />
        </div>
    )
}

export default Timer

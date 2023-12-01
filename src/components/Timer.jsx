import React from 'react';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

function Timer({setArrive, setDepart, data}) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleChangeArrive = (e) => {
        setStartDate(e);
        e = format(e, 'MM/dd/yyyy h:mm aa')
        const value = e.toString();
        setArrive(value);
    }
    const handleChangeDepart = (e) => {
        if (e instanceof Date && !isNaN(e)) {
            setEndDate(e);
            const formattedDate = format(e, 'MM/dd/yyyy h:mm aa');
            const value = formattedDate.toString();
            setDepart(value);
        } else {
            // Handle invalid date type
            console.error('Invalid date type for departure');
        }
    }
    
    return (
        //stint.Date_Time_Start
        <div className="time-button">
            <p>Time arrive: {data.arrive}</p>
            <DatePicker
                selected={startDate}
                onChange={(e) => handleChangeArrive(e)}              
                showTimeSelect
                timeIntervals={1}
                placeholderText={"Click to Select a Time"}
                dateFormat={"MM/dd/yyyy h:mm aa"}
            />
            
            
            <p>Time depart: {data.depart}</p>
            <DatePicker
                selected = {endDate}
                onChange={(e) => handleChangeDepart(e)} 
                showTimeSelect
                timeIntervals={1}
                placeholderText={"Click to Select a Time"}
                dateFormat={"MM/dd/yyyy h:mm aa"}
            />
        </div>
      
    )
}

export default Timer




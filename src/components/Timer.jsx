import React from 'react'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StintData from './StintData';
import { handleChange } from 'react';
function Timer({setArrive, setDepart, data}) {
    const date = new Date();
    var [SetArrive, setStartDate] = useState(date);
    var [SetDepart, setDepartDate] = useState(new Date());
    // <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} 
    //data={{ arrive: feeding.Time_Arrive, depart: feeding.Time_Depart }} />
    
    //feeding.Time_Arrive needs to be updated
    //stint.Date_Time_Start needs to be updated
    
    return (
        //stint.Date_Time_Start
        <div className="time-button">
        
        <p>Time arrive: {data.arrive} </p>
        <DatePicker
                selected = {SetArrive}
                onChange={(SetArrive) => setStartDate(setArrive)}
                showTimeSelect
                placeholderText="No Time Entered"
                dateFormat="MMMM d, yyyy h:mm aa"
                
            /> 
            <p>{setArrive}</p>
            

            
            
            <p>Time depart: {data.depart}</p>
            <DatePicker
                selected = {SetDepart}
                onChange={(SetDepart) => setDepartDate(setDepart)}
                showTimeSelect
                placeholderText="No Time Entered"
                dateFormat="MMMM d, yyyy h:mm aa"
            />
        </div>
      
    )
}

export default Timer

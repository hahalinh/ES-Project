import React from 'react'
import DatePicker from "react-datepicker";
//import Datetime from 'react-datetime';
import "react-datepicker/dist/react-datepicker.css";

function Timer({setArrive, setDepart, data}) {
    const handleChangeArrive = (e) => {
        console.log(e);
        const value = e.toString();
        console.log(value);
        setArrive(value);
    }
    const handleChangeDepart = (e) => {
        console.log(e);
        const value = e.toString();
        console.log(value);
        //setDepart(value);
    }

    return (
        <div className="time-button">
            <p>Time arrive: {data.arrive}</p>
            <DatePicker
                selected = {Date.parse(data.arrive)}
                onChange={(e) => handleChangeArrive(e)}               
                showTimeSelect
                timeIntervals={1}
                placeholderText="No Time Entered"
                dateFormat={"MM/dd/yyyy h:mm aa"}
            />
            
            
            <p>Time depart: {data.depart}</p>
            <DatePicker
                selected = {Date.parse(data.depart)}
                onChange={(e) => handleChangeDepart(e)} 
                showTimeSelect
                timeIntervals={1}
                placeholderText="No Time Entered"
                dateFormat={"MM/dd/yyyy h:mm aa"}
            />
        </div>
    )
}

export default Timer

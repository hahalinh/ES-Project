import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Timer({setArrive, setDepart, data}) {
    //var [setArrive, setStartDate] = useState(new Date());
    //var [setDepart, setDepartDate] = useState(new Date());

    return (
        <div className="time-button">
            <p>Time arrive: {data.arrive}</p>
            <DatePicker
                selected = {data.arrive}
                onChange={(date)=> setArrive(date)}               
                showTimeSelect
                placeholderText="No Time Entered"
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            
            
            <p>Time depart: {data.depart}</p>
            <DatePicker
                selected = {data.arrive}
                onChange={(date)=> setDepart(date)}
                showTimeSelect
                placeholderText="No Time Entered"
                dateFormat="MMMM d, yyyy h:mm aa"
            />
        </div>
    )
}

export default Timer

import React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Island from './stintl/Island'
import Species from './stintl/Species'
import Name from './stintl/Name'
import ObserverLocation from './stintl/ObserverLocation'
import Timer from './Timer';

function StintlData() {
    const initialStintl = {
        StintlID: uuid().slice(0, 8),
        Stintl_Type: "Chick Provisioning",
        Island: "",
        Species: "",
        Prey_Size_Method: "Numeric",
        Prey_Size_Reference: "Culmen length",
        FirstName: "",
        LastName: "",
        Observer_Location: "",
        Date_Time_Start: "",
        Date_Time_End: ""
    };
    const [stintl, setStintl] = useState(initialStintl);

    const setIsland = (val) => {
        setStintl({ ...stintl, Island: val });
    }

    const setSpecies = (val) => {
        setStintl({ ...stintl, Species: val });
    }

    const setName = (val, type) => {
        if (type === "first") {
            setStintl({ ...stintl, FirstName: val })
        }
        else {
            setStintl({ ...stintl, LastName: val });
        }
    }

    const setObserverLocation = (val) => {
        setStintl({ ...stintl, Observer_Location: val })
    }

    /**
 * Helper method for set time arrive and depart
 * @returns a string representation of current time
 */
    const getDate = () => {
        const d = new Date();
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();
        return `${month}/${day}/${year} ${d.toTimeString().slice(0, 8)}`;
    }

    /**
     * this sets the time arrive data to the current time and time depart data to empty
     */
    const setTimeArrive = () => {
        setStintl({ ...stintl, Date_Time_Start: getDate(), Date_Time_End: "" })
    }

    /**
     * this sets the time depart data to the current time
     */
    const setTimeDepart = () => {
        setStintl({ ...stintl, Date_Time_End: getDate() })
    }

    return (
        <div>
            <div>
                <p>Stintl type: {stintl.Stintl_Type}</p>
                <p>Prey size method: {stintl.Prey_Size_Method}</p>
                <p>Prey size reference: {stintl.Prey_Size_Reference}</p>
            </div>
            <div>
                <Island setIsland={setIsland} data={stintl.Island}/>
            </div>
            <Species setSpecies={setSpecies} data={stintl.Species}/>
            <Name setName={setName} data={{first: stintl.FirstName, last: stintl.LastName}}/>
            <ObserverLocation setObs={setObserverLocation} data={stintl.Observer_Location}/>
            <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} data={{arrive: stintl.Date_Time_Start, depart: stintl.Date_Time_End}}/>
        </div>
    )
}

export default StintlData
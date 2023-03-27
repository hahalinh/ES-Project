import React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Island from './stintl/Island'
import Species from './stintl/Species'
import Name from './stintl/Name'
import ObserverLocation from './stintl/ObserverLocation'
import Timer from './Timer';
import { saveAs } from 'file-saver';
import FeedingData from './FeedingData';

function StintlData() {
    //feeding data
    const initialFeeding = {
        feedingID: uuid().slice(0, 8),
        nest: "",
        timeArrive: "",
        timeDepart: "",
        provider: "",
        recipent: "",
        preyItem: "",
        preySize: "",
        numberItems: 1
    }

    //stintl data
    const [stintl, setStintl] = useState({
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
        Date_Time_End: "",
        feedingData: []
    });

    //display stintl/feeding data
    const [isOpenF, setIsOpenF] = useState(false);

    /**
     * Sets the island data in stintl
     * @param {*} val 
     */
    const setIsland = (val) => {
        setStintl({ ...stintl, Island: val });
    }

    /**
     * Sets the species data in stintl
     * @param {*} val 
     */
    const setSpecies = (val) => {
        setStintl({ ...stintl, Species: val });
    }

    /**
     * Sets the first or last name data in stitnl
     * @param {*} val 
     * @param {*} type 
     */
    const setName = (val, type) => {
        if (type === "first") {
            setStintl({ ...stintl, FirstName: val })
        }
        else {
            setStintl({ ...stintl, LastName: val });
        }
    }

    /**
     * Sets the observer location data in stintl
     * @param {*} val 
     */
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
     * Sets the time arrive data to the current time and time depart data to empty
     */
    const setTimeArrive = () => {
        setStintl({ ...stintl, Date_Time_Start: getDate(), Date_Time_End: "" })
    }

    /**
     * Sets the time depart data to the current time
     */
    const setTimeDepart = () => {
        setStintl({ ...stintl, Date_Time_End: getDate() })
    }

    /**
     * Sets the feeding data in stintl
     * @param {*} value 
     */
    const setFeedings = (value) => {
        setStintl({ ...stintl, feedingData: value });
    }

    //Converts and saves stintl data to computer (in progress)
    const handleSaveClick = () => {
        const fields = ['StintID', 'Stint_Type', 'Island', 'Species', 'Prey_Size_Method', 'Prey_Size_Reference', 'FirstName', 'LastName',
            'Observer_Location', 'Date_Time_Start', 'Date_Time_End', 'FeedingID', 'Nest', 'Time_Arrive', 'Time_Depart', 'Provider',
            'Recipient', 'Prey_Item', 'Prey_Size', 'Number_of_Items'];

        let csv = '';

        const data = stintl;

        csv += Object.keys(data).join(',') + '\n';

        data.feedingData.forEach(function (row) {
            let values = fields.map(function (field) {
                return row[field];
            });
            csv += values.join(',') + '\n';
        });

        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        // saveAs(file, 'data.csv');
    }

    return (
        <div>
            <button onClick={() => setIsOpenF(!isOpenF)}>
                {
                    !isOpenF ? 'Open Feeding' : 'Back to Stintl'
                }
            </button>
            {
                !isOpenF ? (
                    <>
                        <button onClick={handleSaveClick}>Save file</button>
                        <div>
                            <p>Stintl type: {stintl.Stintl_Type}</p>
                            <p>Prey size method: {stintl.Prey_Size_Method}</p>
                            <p>Prey size reference: {stintl.Prey_Size_Reference}</p>
                        </div>
                        <div>
                            <Island setIsland={setIsland} data={stintl.Island} />
                        </div>
                        <Species setSpecies={setSpecies} data={stintl.Species} />
                        <Name setName={setName} data={{ first: stintl.FirstName, last: stintl.LastName }} />
                        <ObserverLocation setObs={setObserverLocation} data={stintl.Observer_Location} />
                        <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} data={{ arrive: stintl.Date_Time_Start, depart: stintl.Date_Time_End }} />
                    </>
                )
                    :

                    (
                        <>
                            <div style={{ marginTop: '50px' }}>
                                <FeedingData initialFeeding={initialFeeding} setFeedings={setFeedings} feedings={stintl.feedingData} />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default StintlData

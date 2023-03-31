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

    /**
     * Convert json data to a string representation of csv
     * @param {*} json 
     * @returns 
     */
    const jsonToCSV = (json) => {
        const header = [
            'StintlID', 'Stintl_Type', 'Island', 'Species', 'Prey_Size_Method', 'Prey_Size_Reference',
            'FirstName', 'LastName', 'Observer_Location', 'Date_Time_Start', 'Date_Time_End',
            'feedingID', 'nest', 'timeArrive', 'timeDepart', 'provider', 'recipient', 'preyItem', 'preySize', 'numberItems'
        ];
        const csvRows = [header.join(',')];

        json.feedingData.forEach(feeding => {
            const row = [
                json.StintlID, json.Stintl_Type, json.Island, json.Species, json.Prey_Size_Method, json.Prey_Size_Reference,
                json.FirstName, json.LastName, json.Observer_Location, json.Date_Time_Start, json.Date_Time_End,
                feeding.feedingID, feeding.nest, feeding.timeArrive, feeding.timeDepart, feeding.provider, feeding.recipent,
                feeding.preyItem, feeding.preySize, feeding.numberItems
            ];
            csvRows.push(row.join(','));
        });

        return csvRows.join('\n');
    }

    function csvToJson(csv) {
        const lines = csv.split('\n');
        const header = lines[0].split(',');
        const dataLines = lines.slice(1);

        const feedingData = dataLines.map(line => {
            const values = line.split(',');
            const feeding = {};

            for (let i = 0; i < header.length; i++) {
                if (i < 11) {
                    // Skip first 11 columns as they're not part of the feeding data
                    continue;
                }
                feeding[header[i]] = values[i];
            }

            return feeding;
        });

        const jsonObject = {
            StintlID: header[0],
            Stintl_Type: header[1],
            Island: header[2],
            Species: header[3],
            Prey_Size_Method: header[4],
            Prey_Size_Reference: header[5],
            FirstName: header[6],
            LastName: header[7],
            Observer_Location: header[8],
            Date_Time_Start: header[9],
            Date_Time_End: header[10],
            feedingData: feedingData
        };

        return jsonObject;
    }

    //Converts and saves stintl data to computer (in progress)
    const handleSaveClick = () => {
        let csv = '';
        const data = stintl;

        csv += jsonToCSV(data);

        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        
        saveAs(file, 'data.csv');
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

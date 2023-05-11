import React from 'react';
import { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import Island from './stintl/Island'
import Species from './stintl/Species'
import Name from './stintl/Name'
import ObserverLocation from './stintl/ObserverLocation'
import DataTable from './stintl/DataTable';

import Timer from './Timer';
import { saveAs } from 'file-saver';
import FeedingData from './FeedingData';

function StintData() {
    //feeding data
    const initialFeeding = {
        FeedingID: 1,
        Nest: "",
        Time_Arrive: "",
        Time_Depart: "",
        Provider: "",
        Recipient: "",
        Prey_Item: "",
        Prey_Size: "",
        Number_of_Items: 1,
        Plot_Status: ""
    }

    //stint data
    const [stint, setStint] = useState({
        StintID: uuid().slice(0, 8),
        Stint_Type: "Chick Provisioning",
        Island: "",
        Species: "",
        Prey_Size_Method: "Numeric",
        Prey_Size_Reference: "Culmen length",
        FirstName: "",
        LastName: "",
        Observer_Location: "",
        Date_Time_Start: "",
        Date_Time_End: "",
        feedingData: [initialFeeding]
    });

    //display stintl/feeding data
    const [isOpenF, setIsOpenF] = useState(false);
    const fileInput = useRef(null);

    /**
     * Sets the island data in stintl
     * @param {*} val 
     */
    const setIsland = (val) => {
        setStint({ ...stint, Island: val });
    }

    /**
     * Sets the species data in stintl
     * @param {*} val 
     */
    const setSpecies = (val) => {
        setStint({ ...stint, Species: val });
    }

    /**
     * Sets the first or last name data in stitnl
     * @param {*} val 
     * @param {*} type 
     */
    const setName = (val, type) => {
        if (type === "first") {
            setStint({ ...stint, FirstName: val })
        }
        else {
            setStint({ ...stint, LastName: val });
        }
    }

    /**
     * Sets the observer location data in stintl
     * @param {*} val 
     */
    const setObserverLocation = (val) => {
        setStint({ ...stint, Observer_Location: val })
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
        setStint({ ...stint, Date_Time_Start: getDate(), Date_Time_End: "" })
    }

    /**
     * Sets the time depart data to the current time
     */
    const setTimeDepart = () => {
        setStint({ ...stint, Date_Time_End: getDate() })
    }

    /**
     * Sets the feeding data in stintl
     * @param {*} value 
     */
    const setFeedings = (value) => {
        setStint({ ...stint, feedingData: value });
    }

    /**
     * Convert json data to a string representation of csv
     * @param {*} json 
     * @returns 
     */
    const jsonToCSV = (json) => {
        const header = [
            'StintID', 'Stint_Type', 'Island', 'Species', 'Prey_Size_Method', 'Prey_Size_Reference',
            'FirstName', 'LastName', 'Observer_Location', 'Date_Time_Start', 'Date_Time_End',
            'FeedingID', 'Nest', 'Time_Arrive', 'Time_Depart', 'Provider', 'Recipient', 'Prey_Item', 'Prey_Size',
            'Number_of_Items', 'Plot_Status'
        ];
        const csvRows = [header.join(',')];

        json.feedingData.forEach(feeding => {
            const row = [
                json.StintID, json.Stint_Type, json.Island, json.Species, json.Prey_Size_Method, json.Prey_Size_Reference,
                json.FirstName, json.LastName, json.Observer_Location, json.Date_Time_Start, json.Date_Time_End,
                feeding.FeedingID, feeding.Nest, feeding.Time_Arrive, feeding.Time_Depart, feeding.Provider, feeding.Recipent,
                feeding.Prey_Item, feeding.Prey_Size, feeding.Number_of_Items, feeding.Plot
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

            // Skip first 11 columns as they're not part of the feeding data
            for (let i = 11; i < header.length; i++) {
                feeding[header[i]] = values[i];
            }

            return feeding;
        });

        const stintData = dataLines[0].split(',');

        const jsonObject = {
            StintID: stintData[0],
            Stint_Type: stintData[1],
            Island: stintData[2],
            Species: stintData[3],
            Prey_Size_Method: stintData[4],
            Prey_Size_Reference: stintData[5],
            FirstName: stintData[6],
            LastName: stintData[7],
            Observer_Location: stintData[8],
            Date_Time_Start: stintData[9],
            Date_Time_End: stintData[10],
            feedingData: feedingData
        };

        return jsonObject;
    }

    const handleSaveClick = () => {
        let csv = '';
        const data = stint;

        csv += jsonToCSV(data);

        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });

        saveAs(file, `${stint.Island}_${stint.LastName}_${stint.Species}.csv`);
    }

    const handleOpenClick = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const csv = e.target.result;
            const stintl = csvToJson(csv);
            setStint(stintl);
        };

        reader.onerror = () => {
            alert('Error reading the CSV file.');
        };

        reader.readAsText(file);
    }

    return (
        <div>

            {
                !isOpenF ?
                    (
                        <>
                            <div className="start-stint">


                                <h1>Start a Stint</h1>

                                <div className="login-column">

                                    <div className="left-column">
                                        <p>Stint type: {stint.Stint_Type}</p>
                                        <p>Prey size method: {stint.Prey_Size_Method}</p>
                                        <p>Prey size reference: {stint.Prey_Size_Reference}</p>
                                        <Island setIsland={setIsland} data={stint.Island} />
                                        <Species setSpecies={setSpecies} data={stint.Species} />
                                    </div>

                                    <div className="right-column">
                                        <Name setName={setName} data={{ first: stint.FirstName, last: stint.LastName }} />
                                        <ObserverLocation setObs={setObserverLocation} data={stint.Observer_Location} />
                                        <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} data={{ arrive: stint.Date_Time_Start, depart: stint.Date_Time_End }} />

                                    </div>

                                </div>

                                <div className="login-btn">
                                    <button onClick={() => setIsOpenF(!isOpenF)}>
                                        {
                                            !isOpenF ? 'Open Feeding' : 'Back to Stint'
                                        }
                                    </button>

                                    <button onClick={handleSaveClick}>Save file</button>


                                    <input
                                        type="file"
                                        ref={fileInput}
                                        accept=".csv"
                                        onChange={(e) => handleOpenClick(e)}
                                    />

                                </div>

                                <div>
                                    {/* <button onClick={handleShowData}> Show data</button>
                                    <div id="data-table"></div> */}
                                    <DataTable stint={stint} />

                                </div>
                            </div>
                        </>
                    )
                    :

                    (

                        <>
                            <button onClick={() => setIsOpenF(!isOpenF)}>
                                {
                                    !isOpenF ? 'Open Feeding' : 'Back to Stint'
                                }
                            </button>
                            <div>
                                <FeedingData initialFeeding={initialFeeding} setFeedings={setFeedings} feedings={stint.feedingData} />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default StintData

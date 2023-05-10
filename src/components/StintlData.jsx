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



function StintlData() {
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
            'FeedingID', 'Nest', 'Time_Arrive', 'Time_Depart', 'Provider', 'Recipient', 'Prey_Item', 'Prey_Size', 
            'Number_of_Items', 'Plot_Status'
        ];
        const csvRows = [header.join(',')];

        json.feedingData.forEach(feeding => {
            const row = [
                json.StintlID, json.Stintl_Type, json.Island, json.Species, json.Prey_Size_Method, json.Prey_Size_Reference,
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

        const stintlData = dataLines[0].split(',');

        const jsonObject = {
            StintlID: stintlData[0],
            Stintl_Type: stintlData[1],
            Island: stintlData[2],
            Species: stintlData[3],
            Prey_Size_Method: stintlData[4],
            Prey_Size_Reference: stintlData[5],
            FirstName: stintlData[6],
            LastName: stintlData[7],
            Observer_Location: stintlData[8],
            Date_Time_Start: stintlData[9],
            Date_Time_End: stintlData[10],
            feedingData: feedingData
        };

        return jsonObject;
    }

    const handleSaveClick = () => {
        let csv = '';
        const data = stintl;

        csv += jsonToCSV(data);

        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });

        saveAs(file, 'data.csv');
    }

    const handleOpenClick = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const csv = e.target.result;
            const stintl = csvToJson(csv);
            setStintl(stintl);
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
                                        <p>Stintl type: {stintl.Stintl_Type}</p>
                                        <p>Prey size method: {stintl.Prey_Size_Method}</p>
                                        <p>Prey size reference: {stintl.Prey_Size_Reference}</p>
                                        <Island setIsland={setIsland} data={stintl.Island} />
                                        <Species setSpecies={setSpecies} data={stintl.Species} />
                                    </div>

                                    <div className="right-column">
                                        <Name setName={setName} data={{ first: stintl.FirstName, last: stintl.LastName }} />
                                        <ObserverLocation setObs={setObserverLocation} data={stintl.Observer_Location} />
                                        <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} data={{ arrive: stintl.Date_Time_Start, depart: stintl.Date_Time_End }} />

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
                                    <DataTable stintl = {stintl}/>

                                </div>
                            </div>
                        </>
                    )
                    :

                    (

                        <>
                            <button onClick={() => setIsOpenF(!isOpenF)}>
                                {
                                    !isOpenF ? 'Open Feeding' : 'Back to Stintl'
                                }
                            </button>
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

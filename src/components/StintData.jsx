import React from 'react';
import { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import Island from './stintl/Island'
import Species from './stintl/Species'
import Name from './stintl/Name'
import ObserverLocation from './stintl/ObserverLocation'
import DataTable from './stintl/DataTable';
import Date from '../Date'
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
        Number_of_Items: [
            {
                Recipient: "",
                Prey_Item: "",
                Prey_Size: "",
            }
        ],
        Plot_Status: "Outside Plot"
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
     * Sets the time arrive data to the current time and time depart data to empty
     */
    const setTimeArrive = () => {
        setStint({ ...stint, Date_Time_Start: Date.getDate(), Date_Time_End: "" })
    }

    /**
     * Sets the time depart data to the current time
     */
    const setTimeDepart = () => {
        setStint({ ...stint, Date_Time_End: Date.getDate() })
    }

    /**
     * Sets the feeding data in stintl
     * @param {*} value 
     */
    const setFeedings = (value) => {
        setStint({ ...stint, feedingData: value });
    }

    /**
     * Converts json data to a string representation of csv
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
            feeding.Number_of_Items.forEach(item => {
                //careful with Number_of_Items as it is not an integer anymore but JSON so feeding.Number_of_Items.length
                const row = [
                    json.StintID, json.Stint_Type, json.Island, json.Species, json.Prey_Size_Method, json.Prey_Size_Reference,
                    json.FirstName, json.LastName, json.Observer_Location, json.Date_Time_Start, json.Date_Time_End,
                    feeding.FeedingID, feeding.Nest, feeding.Time_Arrive, feeding.Time_Depart, feeding.Provider, item.Recipient,
                    item.Prey_Item, item.Prey_Size, feeding.Number_of_Items.length, feeding.Plot_Status
                ];
                csvRows.push(row.join(','));
            });
        });

        return csvRows.join('\n');
    };

    /**
     * Converts csv data to stint JSON object
     * @param {*} csv 
     * @returns 
     */
    function csvToJson(csv) {
        const lines = csv.split('\n');
        const dataLines = lines.slice(1);

        const feedingData = [];

        let currentFeedingID = null;
        let currentFeeding = null;
        let currentNumberOfItems = [];

        for (const line of dataLines) {
            const values = line.split(',');
            const feedingID = values[11];

            if (feedingID !== currentFeedingID) {
                if (currentFeedingID !== null) {
                    currentFeeding.Number_of_Items = currentNumberOfItems;
                    feedingData.push(currentFeeding);
                }
                currentFeedingID = feedingID;
                currentFeeding = {
                    FeedingID: feedingID,
                    Nest: values[12],
                    Time_Arrive: values[13],
                    Time_Depart: values[14],
                    Provider: values[15],
                };
                currentNumberOfItems = [];
            }

            currentNumberOfItems.push({
                Recipient: values[16],
                Prey_Item: values[17],
                Prey_Size: values[18],
            });

            currentFeeding.Plot_Status = values[20];
        }

        currentFeeding.Number_of_Items = currentNumberOfItems;
        feedingData.push(currentFeeding);

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
            feedingData: feedingData,
        };

        return jsonObject;
    }

    const handleSaveClick = () => {
        let csv = '';
        const data = stint;
        const emptyFields = [];

        //Check for missing fields in stint data
        Object.entries(data).forEach(([key, value]) => {
            if (value === "") {
                emptyFields.push(`Stint: ${key}`);
            }
        })

        // Check for missing fields in feeding data
        data.feedingData.forEach((feeding, feedingIndex) => {
            Object.keys(feeding).forEach(key => {
                if (Array.isArray(feeding[key])) {
                    feeding[key].forEach((item, itemIndex) => {
                        Object.keys(item).forEach(itemKey => {
                            if (item[itemKey] === '') {
                                emptyFields.push(`Feeding ${feedingIndex + 1}, Item ${itemIndex + 1}: ${itemKey}`);
                            }
                        });
                    });
                } else {
                    if (feeding[key] === '') {
                        emptyFields.push(`Feeding ${feedingIndex + 1}: ${key}`);
                    }
                }
            });
        });

        if (emptyFields.length > 0) {
            alert(`Missing fields:\n${emptyFields.join('\n')}`);
            return;
        }

        // If all information is filled
        csv += jsonToCSV(data);

        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });

        const dowloadName = `${stint.Island}_${stint.Species}_${stint.Date_Time_Start}_${stint.LastName}_${stint.FirstName}.csv`.replace(/ /g, "-");

        saveAs(file, dowloadName);
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


                                <h1>Start A Stint</h1>

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

                                <DataTable stint={stint} />

                            </div>
                        </>
                    )
                    :
                    (

                        <>
                            {/* <button onClick={() => setIsOpenF(!isOpenF)}>
                                {
                                    !isOpenF ? 'Open Feeding' : 'Back to Stint'
                                }
                            </button> */}
                            <div>
                                <FeedingData
                                    initialFeeding={initialFeeding}
                                    setFeedings={setFeedings}
                                    feedings={stint.feedingData}
                                    isOpen={isOpenF}
                                    onToggle={() => setIsOpenF(!isOpenF)}

                                />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default StintData

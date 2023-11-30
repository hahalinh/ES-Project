import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import Island from './stintl/Island'
import Species from './stintl/Species'
import Name from './stintl/Name'
import ObserverLocation from './stintl/ObserverLocation'
import DataTable from './stintl/DataTable';
import Date from '../Date'
import Timer from './Timer';
import Comment from './Comment';
import { saveAs } from 'file-saver';
import FeedingData from './FeedingData';

function StintData() {
    const [csv_uploaded, setcsv] = useState(" ");
    const clearTime = () => {
        
    }
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
        Plot_Status: "Outside Plot",
        Comment: ""
    }
    //added a way to track arrival times
    const [Arrival, setArrival] = useState(false); 
    const [Depart, setDepart] = useState(false); 
    
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
        Comment: "",
        feedingData: [initialFeeding]
    });

    const [stintID, setStintID] = useState(`${stint.Island}-${stint.Species}-${stint.Date_Time_Start}-${stint.FirstName}-${stint.LastName}`)

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
    const setTimeArrive = (date) => {
        setStint({ ...stint, Date_Time_Start: Date.getDate(), Date_Time_End: "" })
    }

    const setTimeArrive2 = (date) => {
        setArrival(true)
        setStint({ ...stint, Date_Time_Start: date })
    }

    /**
     * Sets the time depart data to the current time
     */
    const setTimeDepart = (date) => {
        setStint({ ...stint, Date_Time_End: Date.getDate() })
        
    }

    const setTimeDepart2 = (date) => {
        setDepart(true)
        setStint({ ...stint, Date_Time_End: date })
    }

    /**
     * Sets the feeding data in stintl
     * @param {*} value 
     */
    const setFeedings = (value) => {
        setStint({ ...stint, feedingData: value });
    }

    /**
     * Sets the comment in stint data
     * @param {*} value 
     */
    const setComment = (value) => {
        setStint({...stint, Comment: value});
    }

    /**
     * Converts json data to a string representation of csv
     * @param {*} json 
     * @returns 
     */
    const jsonToCSV = (json) => {
        const header = [
            'StintID', 'Stint_Type', 'Island', 'Species', 'Prey_Size_Method', 'Prey_Size_Reference',
            'FirstName', 'LastName', 'Observer_Location', 'Date_Time_Start', 'Date_Time_End', 'Stint_Comment',
            'FeedingID', 'Nest', 'Time_Arrive', 'Time_Depart', 'Provider', 'Recipient', 'Prey_Item', 'Prey_Size',
            'Number_of_Items', 'Plot_Status', 'Feeding_Comment'
        ];
        const csvRows = [header.join(',')];

        json.feedingData.forEach(feeding => {
            feeding.Number_of_Items.forEach(item => {
                //careful with Number_of_Items as it is not an integer anymore but JSON so feeding.Number_of_Items.length
                const row = [
                    json.StintID, json.Stint_Type, json.Island, json.Species, json.Prey_Size_Method, json.Prey_Size_Reference,
                    json.FirstName, json.LastName, json.Observer_Location, json.Date_Time_Start, json.Date_Time_End, json.Comment,
                    feeding.FeedingID, feeding.Nest, feeding.Time_Arrive, feeding.Time_Depart, feeding.Provider, item.Recipient,
                    item.Prey_Item, item.Prey_Size, feeding.Number_of_Items.length, feeding.Plot_Status, feeding.Comment
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
            const feedingID = values[12];

            if (feedingID !== currentFeedingID) {
                if (currentFeedingID !== null) {
                    currentFeeding.Number_of_Items = currentNumberOfItems;
                    feedingData.push(currentFeeding);
                }
                currentFeedingID = feedingID;
                currentFeeding = {
                    FeedingID: feedingID,
                    Nest: values[13],
                    Time_Arrive: values[14],
                    Time_Depart: values[15],
                    Provider: values[16],
                };
                currentNumberOfItems = [];
            }

            currentNumberOfItems.push({
                Recipient: values[17],
                Prey_Item: values[18],
                Prey_Size: values[19],
            });

            currentFeeding.Plot_Status = values[21];
            currentFeeding.Comment = values[22];
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
            Comment: stintData[11],
            feedingData: feedingData,
        };

        return jsonObject;
    }

    const handleSaveClick = () => {
        let csv = '';
        let data = stint;
        data.StintID = stintID;
        const emptyFields = [];
        const excludeKey = ["Comment", "FirstName"]; //this can be missing in data

        //Check for missing fields in stint data
        Object.entries(data).forEach(([key, value]) => {
            if (value === "" && !excludeKey.includes(key)) {
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
                    if (feeding[key] === '' && !excludeKey.includes(key)) {
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

        const dowloadName = stintID;

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
    
    const processCSVData = (data) => {
        // Here, you can process the CSV data (e.g., parsing it into an array or object)
        // For example, you can use a library like 'csv-parser' or write custom parsing logic
        const obj = {};
        const lines = data.split('\n');
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/\r/g, '').split(',');
        };
        
        for (let i = 0; i < lines.length; i++) {
            obj[lines[i][0]] = lines[i].slice(1);
        };
        // console.log(obj);
        return obj;
    };
    
    const handleCFGOpenClick = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        setcsv(file);
        reader.onload = (e) => {
            const csv = e.target.result;
            
            const drop = processCSVData(csv);
            const keyList = Object.keys(drop)
            // console.log("key list: " + JSON.stringify(keyList))

            // console.log("handleCFGOpenClick drop: "+ drop)
            for (let i = 0; i < keyList.length; i++) {
                const keyvar = keyList[i];
                console.log("handleCFGOpenClick: " + keyvar + "\t" + JSON.stringify(drop[keyvar]));
                localStorage.setItem(keyvar, JSON.stringify(drop[keyvar]));
            }
            // console.log("handleCFGOpenClick: " + JSON.stringify(drop["Nest"]))
        };

        reader.onerror = () => {
            alert('Error reading the CSV file.');
        };

        reader.readAsText(file);
        refreshPage();
    }

    function refreshPage() {
        window.location.reload(false);
    }
    
    //detect change in stint to create stintID
    useEffect(() => {
        setStintID(`${stint.Island}-${stint.Species}-${stint.Date_Time_Start}-${stint.FirstName}-${stint.LastName}`.replace(" ", "-"));
    }, [stint])
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
                                        <p>StintID: {stintID}</p>
                                        <p>Stint type: {stint.Stint_Type}</p>
                                        <p>Prey size method: {stint.Prey_Size_Method}</p>
                                        <p>Prey size reference: {stint.Prey_Size_Reference}</p>
                                        <Island setIsland={setIsland} data={stint.Island} />
                                        <Species setSpecies={setSpecies} data={stint.Species} />
                                    </div>

                                    <div className="right-column">
                                        <Name setName={setName} data={{ first: stint.FirstName, last: stint.LastName }} />
                                        <ObserverLocation setObs={setObserverLocation} data={stint.Observer_Location} />
                                        
                                        {/*  */}
                                        <Timer setArrive={setTimeArrive2} setDepart={setTimeDepart2} data={{ arrive: stint.Date_Time_Start, depart: stint.Date_Time_End }} isOpen={isOpenF}/>
                                        
                                        
                                        <Comment setComment={setComment} data={stint.Comment}/>
                                    </div>

                                </div>

                                <div className="login-btn">
                                    <button onClick={() => {
                                        if (!isOpenF && !Arrival){
                                            setTimeArrive();
                                            setArrival(true);
                                        }
                                        setIsOpenF(!isOpenF); 
                                }}>
                                {!isOpenF ? 'Open Feeding' : 'Back to Stint'}
                                </button>

                                    <button onClick={() =>
                                        {
                                            handleSaveClick();
                                            if(!Depart || handleSaveClick.emptyFields.length < 0){
                                                clearTime();
                                                setTimeDepart();
                                                setDepart(true);
                                            }
                                        }
                                        }>Save file</button>

                                   
                                    <input
                                        type="file"
                                        ref={fileInput}
                                        accept=".csv"
                                        onChange={(e) => handleOpenClick(e)}
                                    />

                                    <input
                                        type="file"
                                        ref={fileInput}
                                        accept=".csv"
                                        onChange={(e) => handleCFGOpenClick(e)}
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
                                    file={csv_uploaded}
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

export default StintData;
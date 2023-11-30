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
import FeedingData from './FeedingData';
import { handleSaveClick } from './utility';
import '@fortawesome/fontawesome-free/css/all.css'

function StintData() {
    // When users accidentally close the app, ask for confirmation
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';

            // Display a confirmation dialog to the user
            const confirmationMessage = 'Are you sure you want to leave this page?';
            e.returnValue = window.confirm(confirmationMessage) ? undefined : '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        handleOpenFromLocalStorage();
    }, []);

    /**
     * Handles opening data from localStorage
     */
    const handleOpenFromLocalStorage = () => {
        const backupData = localStorage.getItem('backup');

        console.log("BackupData contents:", backupData);
        
        // if local storage not null
        if (backupData != null) {
            // Parse the JSON data from localStorage
            console.log("Parse the JSON data from localStorage:", backupData);
            const jsonData = JSON.parse(backupData);

            setStint(jsonData);
            setIsOpenF(true);
        }
    };


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
     * Sets the comment in stint data
     * @param {*} value 
     */
    const setComment = (value) => {
        setStint({ ...stint, Comment: value });
    }



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

    //detect change in stint to create stintID
    useEffect(() => {
        setStintID(`${stint.Island}-${stint.Species}-${stint.Date_Time_Start}-${stint.FirstName}-${stint.LastName}`.replace(" ", "-"));
    }, [stint])

    const [showData, setShowData] = useState(false);

    const handleShowData = () => {
        setShowData(!showData);
    };


    return (
        <div className="stint-all">

            {
                !isOpenF ?
                    (
                        <>
                            <div className="start-stint">
                                <div className='stint-form'>
                                    {/* <h1>Start A Stint</h1> */}
                                    <div className='stint-id'>Your Stint ID: {stintID}</div>

                                    <div className="login-column">

                                        <div className="left-column">
                                            <p>Stint type: {stint.Stint_Type}</p>
                                            <p>Prey size method: {stint.Prey_Size_Method}</p>
                                            <p>Prey size reference: {stint.Prey_Size_Reference}</p>
                                            <Island setIsland={setIsland} data={stint.Island} />
                                            <Species setSpecies={setSpecies} data={stint.Species} />
                                            <Comment setComment={setComment} data={stint.Comment} />
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

                                        <button onClick={() => handleSaveClick(stint, stintID)}>Save file</button>

                                        <label for="file-upload" class="custom-file-upload">
                                            <i class="fa fa-cloud-upload"></i> Upload file
                                        </label>

                                        <input
                                            id="file-upload"
                                            type="file"
                                            ref={fileInput}
                                            accept=".csv"
                                            onChange={(e) => handleOpenClick(e)}

                                        />

                                        <button onClick={handleShowData}>
                                            {showData ? "Hide data" : "Show data"}
                                        </button>

                                    </div>
                                    <DataTable stint={stint} showData={showData} />


                                </div>
                            </div>
                        </>
                    )
                    :
                    (

                        <>
                            <div>
                                <FeedingData
                                    initialFeeding={initialFeeding}
                                    setFeedings={setFeedings}
                                    feedings={stint.feedingData}
                                    isOpen={isOpenF}
                                    onToggle={() => setIsOpenF(!isOpenF)}
                                    stint={stint}
                                    stintID={stintID}

                                />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default StintData

import Plot from './feeding/Plot';
import Nest from './feeding/Nest';
import NumberItems from './feeding/NumberItems';
import PreyItem from './feeding/PreyItem';
import PreySize from './feeding/PreySize';
import Provider from './feeding/Provider';
import Recipient from './feeding/Recipient';
import Timer from './Timer';
import { useState, useEffect } from 'react';
import React from 'react';

function FeedingData({ initialFeeding, feedings, setFeedings }) {

    /**
     * this stores and handles input feeding data
     */
    const [feeding, setFeeding] = useState(initialFeeding);
    const [index, setIndex] = useState(0);
    const [closedIndex, setClosedIndex] = useState([]);
    const [displayClosed, setDisplayClosed] = useState(true);

    //a temporary feeding for later checking with feeding to compare differences
    const [feedingTemp, setFeedingTemp] = useState(feeding);

    /**
     * this handles button input for plot data
     * @param {*} Plot
     */
    const setPlot = (Plot) => {
        setFeeding({ ...feeding, Plot_Status: Plot });
    }

    /**
     * this handles button input for nest data
     * @param {*} Nest
     */
    const setNest = (Nest) => {
        setFeeding({ ...feeding, Nest: Nest });
    }

    /**
     * this handles button input for recipent data
     * @param {*} Recipent 
     */
    const setRecipient = (Recipient) => {
        setFeeding({ ...feeding, Recipient: Recipient });
    }

    /**
     * this handles button input for provider data
     * @param {*} Provider 
     */
    const setProvider = (Provider) => {
        setFeeding({ ...feeding, Provider: Provider });
    }

    /**
     * this handles button input for prey item data
     * @param {*} Prey_Item 
     */
    const setPreyItem = (Prey_Item) => {
        setFeeding({ ...feeding, Prey_Item: Prey_Item });
    }

    /**
     * this handles button input for prey size data
     * @param {*} Prey_Size 
     */
    const setPreySize = (Prey_Size) => {
        setFeeding({ ...feeding, Prey_Size: Prey_Size });
    }

    /**
     * this handles input for number of items
     * @param {*} n 
     */
    const setNumberItems = (n) => {
        setFeeding({ ...feeding, Number_of_Items: n });
    }

    /**
     * Helper method for set time arrive and depart
     * @returns a string representation of indexent time
     */
    const getDate = () => {
        const d = new Date();
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();
        return `${month}/${day}/${year} ${d.toTimeString().slice(0, 8)}`;
    }

    /**
     * this sets the time arrive data to the indexent time and time depart data to empty
     */
    const setTimeArrive = () => {
        setFeeding({ ...feeding, Time_Arrive: getDate(), Time_Depart: "" })
    }

    /**
     * this sets the time depart data to the indexent time
     */
    const setTimeDepart = () => {
        setFeeding({ ...feeding, Time_Depart: getDate() })
    }

    /**
     * saves feeding tab at index
     * @param {} index 
     */
    function handleSaveFeeding(index) {
        let newFeedings = [...feedings];
        newFeedings[index] = feeding;
        setFeedings(newFeedings);
        //stamp the temporary feeding
        setFeedingTemp(feeding);
    }

    /**
     * this adds a new empty feeding data
     */
    const handleNewFeeding = () => {
        setFeeding({ ...initialFeeding, FeedingID: feedings.length + 2 });
        setFeedings([...feedings, initialFeeding]);
        setIndex(feedings.length);
        //stamp the temporary feeding
        setFeedingTemp(feeding);
    }

    /**
     * this handles the switching of indexent feeding data to existing feeding data and updating that indexent feeding data if any changes
     * @param {*} e the feeding data ID to switch to
     */
    const handleOpenFeeding = (index) => {
        //Move to another feeding data
        setIndex(index);
        const openF = feedings[index];
        setFeeding(openF);
        //stamp the temporary feeding
        setFeedingTemp(feeding);
    }

    const handleCloseFeeding = (index) => {
        if (closedIndex.includes(index)) {
            let newArr = [...closedIndex];
            newArr = newArr.filter(item => item !== index);

            setClosedIndex(newArr);
            return;
        }

        setClosedIndex([...closedIndex, index]);
    }

    const displayClosedFeeding = (bool) => {
        setDisplayClosed(bool);
    }

    //feature: when open feeding tab, switch to the latest feeding tab
    useEffect(() => {
        if (feedings.length > 0 && index === 0) {
            handleOpenFeeding(feedings.length - 1);
        }
    }, [feedings.length])

    //feature: auto save
    useEffect(() => {
        //if there is a change, save that change
        if (feedingTemp !== feeding) {
            handleSaveFeeding(index);
        }
    }, [feeding])

    return (
        <>
            <div className="outer-container">
                <div className="display-buttons">
                    <div>
                        <button onClick={() => displayClosedFeeding(false)}>Hide closed feeding</button>
                        <button onClick={() => displayClosedFeeding(true)}>Show closed feeding</button>
                    </div>
                    <div className='displayM'>
                        <p>Hide closed: {displayClosed ? "false" : "true"}</p>
                        <p>Is closed: {closedIndex.includes(index) ? "true" : "false"}</p>
                    </div>
                </div>

                <div className="feed_header">
                    Feeding {index + 1}{feeding.Nest !== "" && `: ${feeding.Nest}`}
                </div>

                <div className="menu-container">
                    <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} data={{ arrive: feeding.Time_Arrive, depart: feeding.Time_Depart }} />

                    <div>
                        <Plot setPlot={setPlot} data={feeding.Plot_Status} />
                    </div>

                    <div>
                        <p>Open Feedings:</p>
                        {
                            feedings.map((item, index) => {
                                if (closedIndex.includes(index) && !displayClosed) {
                                    return;
                                }

                                const value = `Feeding ${index + 1}` + (item.Nest !== "" ? `: ${item.Nest}` : "");

                                return (
                                    <input key={index} value={value} type="button"
                                        onClick={() => handleOpenFeeding(index)}
                                    />
                                )
                            })
                        }
                        <div>
                            <button onClick={() => handleNewFeeding()}>New</button>
                            {/* <button onClick={() => handleSaveFeeding(index)}>Save</button> */}
                            <button onClick={() => handleCloseFeeding(index)}>Close</button>
                        </div>
                    </div>
                </div>

                <div className="stintl-container">
                    <div className="box-items">
                        <NumberItems setNumberItems={setNumberItems} data={feeding.Number_of_Items} />
                        <Nest setNest={setNest} data={feeding.Nest} />
                    </div>
                    <Recipient setRecipient={setRecipient} data={feeding.Recipient} />
                    <Provider setProvider={setProvider} data={feeding.Provider} />
                    <PreySize setPreySize={setPreySize} data={feeding.Prey_Size} />
                    <PreyItem setPreyItem={setPreyItem} data={feeding.Prey_Item} />
                </div>
            </div>
        </>
    );
}

export default FeedingData;
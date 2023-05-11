import Plot from './feeding/Plot';
import Nest from './feeding/Nest';
import NumberItems from './feeding/NumberItems';
import PreyItem from './feeding/PreyItem';
import PreySize from './feeding/PreySize';
import Provider from './feeding/Provider';
import Recipient from './feeding/Recipient';
import Timer from './Timer';
import Date from '../Date';
import './ToggleBtn.css';
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

    const [isClosedFeedingShown, setIsClosedFeedingShown] = useState(false);

    const toggleClosedFeeding = () => {
        setIsClosedFeedingShown(!isClosedFeedingShown);
        displayClosedFeeding(!isClosedFeedingShown);
    };


    //a temporary feeding for later checking with feeding to compare differences
    const [feedingTemp, setFeedingTemp] = useState(feeding);

    //index of the number of items (for setting data at index)
    const [nIndex, setNIndex] = useState(0);

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
     * this handles button input for provider data
     * @param {*} Provider 
     */
    const setProvider = (Provider) => {
        setFeeding({ ...feeding, Provider: Provider });
    }

    /**
     * this handles input for number of items
     * @param {*} n 
     */
    const setNumberItems = (item) => {
        setFeeding({ ...feeding, Number_of_Items: item });
    }

    /**
     * this adds an item to Number_of_Items in feeding data
     * @param {*} item 
     */
    const addNumberItems = (item) => {
        setNumberItems([...feeding.Number_of_Items, item])
    }

    /**
    * this handles button input for recipent data
    * @param {*} Recipent 
    */
    const setRecipient = (Recipient) => {
        let items = [...{ ...feeding }.Number_of_Items];
        let item = items[nIndex];
        item.Recipient = Recipient;

        setNumberItems(items);
    }

    /**
     * this handles button input for prey item data
     * @param {*} Prey_Item 
     */
    const setPreyItem = (Prey_Item) => {
        let items = [...{ ...feeding }.Number_of_Items];
        let item = items[nIndex];
        item.Prey_Item = Prey_Item;

        setNumberItems(items);
    }

    /**
     * this handles button input for prey size data
     * @param {*} Prey_Size 
     */
    const setPreySize = (Prey_Size) => {
        let items = [...{ ...feeding }.Number_of_Items];
        let item = items[nIndex];
        item.Prey_Size = Prey_Size;

        setNumberItems(items);
    }

    /**
     * this sets the time arrive data to the indexent time and time depart data to empty
     */
    const setTimeArrive = () => {
        setFeeding({ ...feeding, Time_Arrive: Date.getTime(), Time_Depart: "" })
    }

    /**
     * this sets the time depart data to the indexent time
     */
    const setTimeDepart = () => {
        setFeeding({ ...feeding, Time_Depart: Date.getTime() })
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
        setFeeding({ ...initialFeeding, FeedingID: feedings.length + 1 });
        setFeedings([...feedings, initialFeeding]);
        setIndex(feedings.length);
        //stamp the temporary feeding
        setFeedingTemp(feeding);
        setNIndex(0);
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
        setNIndex(0);
    }

    const handleCloseFeeding = (index) => {
        const emptyFields = [];
        console.log(feedingTemp);

        // Check if all fields in feedingTemp are empty
        for (const field in feedingTemp) {
            const value = feedingTemp[field];
            if (Array.isArray(value)) {
                // If the field is a list, loop through each item
                for (let i = 0; i < value.length; i++) {
                    const item = value[i];
                    // Loop through each field in the item and check if empty
                    for (const itemField in item) {
                        if (item[itemField] === '') {
                            emptyFields.push(`Item ${i + 1} > ${itemField}`);
                        }
                    }
                }
            } else if (value === '') {
                emptyFields.push(field);
            }
        }


        // If any fields are empty, alert the user
        if (emptyFields.length > 0) {
            const missingFields = emptyFields.join(', ');
            alert(`Please fill in the following fields: ${missingFields}`);
        } else {
            // If all fields are filled, close the feeding
            setClosedIndex(closedIndex.includes(index) ?
                closedIndex.filter(item => item !== index) : [...closedIndex, index]);

            // add the class `closed_feeding` to the element
            const feedingElem = document.getElementById(`feeding_${index}`);
            if (feedingElem) {
                feedingElem.classList.add('closed_feeding');
            }
        }

        // make the closed tab disappear
        displayClosedFeeding(false);
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

                <div className="feed_header">
                    Feeding {index + 1}{feeding.Nest !== "" && `: ${feeding.Nest}`}
                </div>

                <div className="menu-container">
                    <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} data={{ arrive: feeding.Time_Arrive, depart: feeding.Time_Depart }} />

                    <div id='plot-noItem-btn'>

                        <Plot setPlot={setPlot} data={feeding.Plot_Status} />
                        <NumberItems addData={addNumberItems} data={feeding.Number_of_Items} changeIndex={setNIndex} nIndex={nIndex} />
                    </div>

                    <div>
                        {/* <div>
                            <button onClick={() => displayClosedFeeding(false)}>Hide closed feeding</button>
                            <button onClick={() => displayClosedFeeding(true)}>Show closed feeding</button>

                        </div> */}

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <p>Show Closed Feeding:</p>
                            {/* <button onClick={toggleClosedFeeding}>
                                {isClosedFeedingShown ? "Hide closed feeding" : "Show closed feeding"}
                            </button> */}

                            <button onClick={toggleClosedFeeding} class="toggle">
                                <input type="checkbox" checked={isClosedFeedingShown} />
                                <span class="toggle-slider"></span>
                                <span class="toggle-label">{isClosedFeedingShown ? "On" : "Off"}</span>
                            </button>
                        </div>
                        {
                            feedings.map((item, i) => {
                                if (closedIndex.includes(i) && !displayClosed) {
                                    return;
                                }

                                const value = `Feeding ${i + 1}` + (item.Nest !== "" ? `: ${item.Nest}` : "");

                                return (
                                    <input key={i} value={value} type="button"
                                        onClick={() => handleOpenFeeding(i)}
                                        className={index === i && "selected-btn"}
                                    />
                                )
                            })
                        }

                        <div>
                            <button onClick={() => handleNewFeeding()}>New</button>
                            <button onClick={() => handleCloseFeeding(index)}>Close</button>
                        </div>
                    </div>
                </div>

                <div className="stintl-container">

                    <Nest setNest={setNest} data={feeding.Nest} />
                    <Provider setProvider={setProvider} data={feeding.Provider} />
                    <Recipient setRecipient={setRecipient} data={feeding.Number_of_Items[nIndex].Recipient} />
                    <PreySize setPreySize={setPreySize} data={feeding.Number_of_Items[nIndex].Prey_Size} />
                    <PreyItem setPreyItem={setPreyItem} data={feeding.Number_of_Items[nIndex].Prey_Item} />
                </div>
            </div>
        </>
    );
}

export default FeedingData;
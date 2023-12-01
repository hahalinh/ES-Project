import Plot from './feeding/Plot';
import Nest from './feeding/Nest';
import NumberItems from './feeding/NumberItems';
import PreyItem from './feeding/PreyItem';
import PreySize from './feeding/PreySize';
import Provider from './feeding/Provider';
import Recipient from './feeding/Recipient';
import Timer from './Timer';
import Date from '../Date';
import Comment from './Comment';
import './ToggleBtn.css'
import { useState, useEffect } from 'react';
import { handleSaveForCloseFeeding } from './utility';
import React from 'react';
import { clear } from '@testing-library/user-event/dist/clear';

function FeedingData({file, initialFeeding, feedings, setFeedings, isOpen, onToggle, stint, stintID }) {
    
    
    const timeLogger = () => {
        if(!feeding.Time_Arrive){
            setTimeArrive();
        }
    };
    const clearTime = () => {
        setFeeding(prevFeeding => ({
            ...prevFeeding,
            Time_Arrive: undefined,
        }));
    }
    /**
     * this stores and handles input feeding data
     */
    const [feeding, setFeeding] = useState(initialFeeding);

    //for current feeding data index
    const [index, setIndex] = useState(0);

    //for closing index
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
    * this handles button input for recipent data
    * @param {*} Recipient 
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

    const setTimeArrive2 = (date) => {
        setFeeding({ ...feeding, Time_Arrive: date })
    }

    /**
     * this sets the time depart data to the indexent time
     */
    const setTimeDepart = () => {
        setFeeding({ ...feeding, Time_Depart: Date.getTime() })
    }

    const setTimeDepart2 = (date) => {
        setFeeding({ ...feeding, Time_Depart: date })
    }

    /**
     * saves feeding tab at index
     * @param {} index 
     */
    const setComment = (value) => {
        setFeeding({...feeding, Comment: value});
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
        const currentFeeding = {...feeding};
        setFeeding({ ...initialFeeding, FeedingID: feedings.length + 1, Time_Arrive: undefined});
        setFeedings([...feedings, initialFeeding]);
        setIndex(feedings.length);
        //stamp the temporary feeding

        //set new time arrival for new feeding
        clearTime();
        //call time logger for new feedings
        timeLogger();

        setFeedingTemp(feeding);
        setNIndex(0);
    }

    /**
     * this deletes feeding data at current index
     */
    const handleDeleteFeeding = () => {
        if (feedings.length > 1) {
            let removed = false;

            const ignore = ["FeedingID"];
            const filled = [];

            Object.entries(feedings[index]).forEach(([key, value]) => {
                if (!ignore.includes(key)) {
                    if (Array.isArray(value)) {
                        Object.values(value).forEach((item, i) => {
                            Object.entries(item).forEach(([keyItem, field]) => {
                                if (field !== "") {
                                    removed = true;
                                    filled.push(`Item ${i + 1}: ` + keyItem);
                                }
                            })
                        })
                    }
                    else if (value !== "") {
                        removed = true;
                        filled.push(value);
                    }
                }
            })

            if (!removed) {
                const newData = feedings.filter((item, i) => i !== index);
                setFeedings(newData);

                if (index === 0) {
                    handleOpenFeeding(0);
                }
                else {
                    handleOpenFeeding(index - 1);
                }
            }
            else {
                alert(`Unable to delete: you have data filled at feeding ${index + 1}. Specifically at: ${filled}`)
            }
        }
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
        setFeedingTemp(feeding);
        setNIndex(0);
    }

    const handleCloseFeeding = (index) => {
        
        const emptyFields = [];
        
        // Check if all fields in feedingTemp are empty
        for (const field in feedingTemp) {
            if (field === 'Comment') {
                continue; // Skip checking if the field is "Comment"
            }
            if (field === 'Time_Depart'){
                continue; // Skip checking if the field is "Time_Depart"
            }
        
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
            if(!feeding.Time_Depart && setClosedIndex(closedIndex.includes(index) ?
            closedIndex.filter(item => item !== index) : [...closedIndex, index]) == undefined){ //if no depart time exists
            setTimeDepart();
        }
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
        displayClosedFeeding(false); //tweaks need 
        // save in local storage
        handleSaveForCloseFeeding(stint, stintID);
    }

    const displayClosedFeeding = (bool) => {
        setDisplayClosed(bool); //issue with this as well
    }
    useEffect(() => {
        timeLogger()
    }, 
    [feeding.Nest, 
    feeding.Provider, 
    feeding.Number_of_Items[nIndex].Recipient, 
    feeding.Number_of_Items[nIndex].Prey_Size,
    feeding.Number_of_Items[nIndex].Prey_Item])
   
    
    //feature: when open feeding tab, switch to the latest feeding tab
    useEffect(() => {
        //index == 0 could be removed?
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

                <div  className="feed_header">
                    {isOpen && (
                        <button onClick={onToggle}>
                            Back to Stint
                        </button>
                    )}
                    <h1>Feeding {index + 1}</h1>

                </div>


                <div className="menu-container">
                    {/*  */}
                    <Timer setArrive={setTimeArrive2} setDepart={setTimeDepart2} data={{ arrive: feeding.Time_Arrive, depart: feeding.Time_Depart }} />
                    
                    <div id='plot-noItem-btn'>

                        <Plot setPlot={setPlot} data={feeding.Plot_Status} />
                        <NumberItems setNumberItems={setNumberItems} data={feeding.Number_of_Items} changeIndex={setNIndex} nIndex={nIndex} />
                    </div>

                    <div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <p>Show Closed Feeding:</p>

                            <button onClick={toggleClosedFeeding} className="toggle">
                                <input type="checkbox" checked={isClosedFeedingShown} />
                                <span className="toggle-slider"></span>
                                <span className="toggle-label">{isClosedFeedingShown ? "On" : "Off"}</span>
                            </button>
                        </div>
                        {
                            feedings.map((item, i) => {
                                if (closedIndex.includes(i) && !displayClosed) {
                                    return null;
                                }

                                const value = `Feeding ${i + 1}` + (item.Nest !== "" ? `: ${item.Nest}` : "");

                                return (
                                    <input key={i} value={value} type="button"
                                        onClick={() => handleOpenFeeding(i)}

                                        // if clicked then log start time
                                        className={index === i ? "selected-btn" : ""}
                                    />
                                )
                            })
                        }

                        <div>
                            <button onClick={() => handleNewFeeding()}>New</button>
                            <button onClick={() => handleDeleteFeeding()}>Delete</button>
                            <button onClick={() => handleCloseFeeding(index)}>Close</button>
                        </div>
                    </div>
                </div>

                <div className="stintl-container">
                    <Nest file={file} setNest={setNest} data={feeding.Nest} />
                    <Provider setProvider={setProvider} data={feeding.Provider} />
                    <Recipient setRecipient={setRecipient} data={feeding.Number_of_Items[nIndex].Recipient} />
                    <PreySize setPreySize={setPreySize} data={feeding.Number_of_Items[nIndex].Prey_Size} />
                    <PreyItem setPreyItem={setPreyItem} data={feeding.Number_of_Items[nIndex].Prey_Item} />
                </div>

                <div>
                    <Comment setComment={setComment} data={feeding.Comment} />
                </div>
            </div>
        </>
    );
}

export default FeedingData;
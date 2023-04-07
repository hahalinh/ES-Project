import Nest from './feeding/Nest';
import NumberItems from './feeding/NumberItems';
import PreyItem from './feeding/PreyItem';
import PreySize from './feeding/PreySize';
import Provider from './feeding/Provider';
import Recipient from './feeding/Recipient';
import Timer from './Timer';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import React from 'react';

//NOTE: A problem with displaying the feeding number and rendering the right feeding tab when switch from stintl to feeding

function FeedingData({initialFeeding, feedings, setFeedings}) {
    /**
     * this stores and handles input feeding data
     */
    const [feeding, setFeeding] = useState(initialFeeding)
    const [index, setIndex] = useState(0);

    /**
     * this handles button input for nest data
     * @param {*} nest
     */
    const setNest = (nest) => {
        setFeeding({ ...feeding, nest: nest });
    }

    /**
     * this handles button input for recipent data
     * @param {*} recipent 
     */
    const setRecipient = (recipent) => {
        setFeeding({ ...feeding, recipent: recipent });
    }

    /**
     * this handles button input for provider data
     * @param {*} provider 
     */
    const setProvider = (provider) => {
        setFeeding({ ...feeding, provider: provider });
    }

    /**
     * this handles button input for prey item data
     * @param {*} preyItem 
     */
    const setPreyItem = (preyItem) => {
        setFeeding({ ...feeding, preyItem: preyItem });
    }

    /**
     * this handles button input for prey size data
     * @param {*} preySize 
     */
    const setPreySize = (preySize) => {
        setFeeding({ ...feeding, preySize: preySize });
    }

    /**
     * this handles input for number of items
     * @param {*} n 
     */
    const setNumberItems = (n) => {
        setFeeding({...feeding, numberItems: n});
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
        setFeeding({ ...feeding, timeArrive: getDate(), timeDepart: "" })
    }

    /**
     * this sets the time depart data to the indexent time
     */
    const setTimeDepart = () => {
        setFeeding({ ...feeding, timeDepart: getDate()})
    }

    /**
     * finds index of this feeding tab
     * @returns index 
     */
    const findCurrIndex = () => feedings.findIndex(item => item.feedingID === feeding.feedingID);

    /**
     * updates and saves the indexent opened feeding tab
     */
     const handleSaveFeeding = () => {
        //Update indexent opened feeding
        const currIndex = findCurrIndex();

        if (currIndex < 0) {
            setFeedings([...feedings, feeding]);
            setIndex(feedings.length);
        }
        else {
            let uFeedings = [...feedings];
            uFeedings[currIndex] = feeding;
            setFeedings(uFeedings);
            setIndex(currIndex);
        }
    }

    /**
     * this handles and adds a new feeding data
     */
    const handleNewFeeding = () => {
        handleSaveFeeding();

        //reset new feeding tab
        setFeeding({...initialFeeding, feedingID: uuid().slice(0, 8)});
    }

    /**
     * this handles the switching of indexent feeding data to existing feeding data and updating that indexent feeding data if any changes
     * @param {*} e the feeding data ID to switch to
     */
    const handleOpenFeeding = (index) => {
        handleSaveFeeding();

        //Move to another feeding data
        setIndex(index);
        const openF = feedings[index];
        setFeeding(openF);
    }

    return (
        <>
            <div className="outer-container">
                <div>
                    Feeding {index + 1}
                </div>
                <div className="menu-container">
                    <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} data={{arrive: feeding.timeArrive, depart: feeding.timeDepart}}/>

                    <div>
                        <p>Open Feedings:</p>
                        {
                            feedings.map((item, index) => {
                                return (
                                    <input key={index} value={`Feeding ${index + 1}`} type="button"
                                        onClick={() => handleOpenFeeding(index)}
                                    />
                                )
                            })
                        }
                        <div>
                            <button onClick={() => handleNewFeeding()}>New</button>
                                <button onClick={() => handleSaveFeeding()}>Save</button>
                        </div>
                    </div>
                </div>

                <div className="stintl-container">
                    <div className="box-items">
                        <Nest setNest={setNest} data={feeding.nest}/>
                        <Recipient setRecipient={setRecipient} data={feeding.recipent}/>
                        <Provider setProvider={setProvider} data={feeding.provider} />
                    </div>
                    <PreyItem setPreyItem={setPreyItem} data={feeding.preyItem} />
                    <PreySize setPreySize={setPreySize} data={feeding.preySize} />
                    <NumberItems setNumberItems={setNumberItems} data={feeding.numberItems} />
                </div>
            </div>
        </>
    );
}

export default FeedingData;

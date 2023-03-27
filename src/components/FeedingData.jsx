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

function FeedingData({initialFeeding, feedings, setFeedings}) {
    
    /**
     * this stores and handles input feeding data
     */
    const [feeding, setFeeding] = useState(initialFeeding)

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
     * this sets the time arrive data to the current time and time depart data to empty
     */
    const setTimeArrive = () => {
        setFeeding({ ...feeding, timeArrive: getDate(), timeDepart: "" })
    }

    /**
     * this sets the time depart data to the current time
     */
    const setTimeDepart = () => {
        setFeeding({ ...feeding, timeDepart: getDate()})
    }

    /**
     * this handles and adds a new feeding data
     */
    const handleNewFeeding = () => {
        const exist = feedings.findIndex(item => item.feedingID === feeding.feedingID);

        if (exist >= 0) {
            let newFeedings = [...feedings];
            newFeedings[exist] = feeding;
            setFeedings(newFeedings);
        }
        else if (exist < 0) {
            setFeedings([...feedings, feeding]);
        }
        setFeeding({...initialFeeding, feedingID: uuid().slice(0, 8)})
    }

    /**
     * this handles the switching of current feeding data to existing feeding data and updating that current feeding data if any changes
     * @param {*} e the feeding data ID to switch to
     */
    const handleOpenFeeding = (e) => {
        //Update current opened feeding
        const curr = feedings.findIndex(item => item.feedingID === feeding.feedingID);
        let uFeedings = [...feedings];
        uFeedings[curr] = feeding;
        setFeedings(uFeedings);

        //Move to another feeding data
        const feedingId = e.currentTarget.value;
        const openF = feedings.find(item => item.feedingID === feedingId);
        setFeeding(openF);
    }

    return (
        <>
            <div className="outer-container">
                <div>{feeding.feedingID}</div>
                <div className="menu-container">
                    <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} data={{arrive: feeding.timeArrive, depart: feeding.timeDepart}}/>

                    <div>
                        <p>Open Feedings:</p>
                        {
                            feedings.map((item, index) => {
                                return (
                                    <input key={index} value={item.feedingID} type="button"
                                        onClick={(e) => handleOpenFeeding(e)}
                                    />
                                )
                            })
                        }
                        <button onClick={handleNewFeeding}>New</button>
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

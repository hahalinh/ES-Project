import Plot from './feeding/Plot';
import Nest from './feeding/Nest';
import NumberItems from './feeding/NumberItems';
import PreyItem from './feeding/PreyItem';
import PreySize from './feeding/PreySize';
import Provider from './feeding/Provider';
import Recipient from './feeding/Recipient';
import Timer from './Timer';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import React from 'react';

function FeedingData({ initialFeeding, feedings, setFeedings }) {
    /**
     * this stores and handles input feeding data
     */
    const [feeding, setFeeding] = useState(initialFeeding)
    const [index, setIndex] = useState(0);

    /**
     * this handles button input for nest data
     * @param {*} nest
     */
    const setPlot = (plot) => {
        setFeeding({ ...feeding, plot: plot });
    }

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
        setFeeding({ ...feeding, numberItems: n });
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
        setFeeding({ ...feeding, timeDepart: getDate() })
    }

    /**
     * saves feeding tab at index
     * @param {} index 
     */
    const handleSaveFeeding = (index) => {
        let uFeedings = [...feedings];
        uFeedings[index] = feeding;
        setFeedings(uFeedings);
    }

    /**
     * this adds a new empty feeding data
     */
    const handleNewFeeding = () => {
        setFeeding({ ...initialFeeding, feedingID: uuid().slice(0, 8) });
        setFeedings([...feedings, initialFeeding]);
        setIndex(feedings.length)
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
    }

    useEffect(() => {
        if (feedings.length > 0 && index === 0) {
            handleOpenFeeding(feedings.length - 1);
        }
    }, [feedings.length])

    return (
        <>
            <div className="outer-container">
                <div class="feed_header">
                    Feeding {index + 1}
                </div>
                <div className="menu-container">
                    <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} data={{ arrive: feeding.timeArrive, depart: feeding.timeDepart }} />

                    <div>
                        <Plot setPlot={setPlot} data={feeding.plot} />
                    </div>

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
                            <button onClick={() => handleSaveFeeding(index)}>Save</button>
                        </div>
                    </div>
                </div>

                <div className="stintl-container">
                    <div className="box-items">
                        <NumberItems setNumberItems={setNumberItems} data={feeding.numberItems} />
                        <Nest setNest={setNest} data={feeding.nest} />
                    </div>
                    <Recipient setRecipient={setRecipient} data={feeding.recipent} />
                    <Provider setProvider={setProvider} data={feeding.provider} />
                    <PreySize setPreySize={setPreySize} data={feeding.preySize} />
                    <PreyItem setPreyItem={setPreyItem} data={feeding.preyItem} />
                </div>
            </div>
        </>
    );
}

export default FeedingData;

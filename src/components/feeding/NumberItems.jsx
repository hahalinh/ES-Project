import React from 'react'

function NumberItems({ data, changeIndex, nIndex, setNumberItems }) {
    const initial_item = {
        Recipient: "",
        Prey_Item: "",
        Prey_Size: "",
    }

    /**
     * Add 1 more item to NumberItems
     */
    const handleAddData = () => {
        setNumberItems([...data, initial_item])
        handleChangeItem(data.length);
    }

    /**
     * Changes the item (including recipient, prey size, prey item) to the specified index in data (NumberItems)
     * @param {*} index 
     */
    const handleChangeItem = (index) => {
        changeIndex(index)
    }

    /**
     * Deletes the item at nIndex if no there is no data
     */
    const handleDeleteData = () => {
        if (data.length > 1) {
            let removed = false;
            const filled = [];

            Object.entries(data[nIndex]).forEach(([key, val]) => {
                if (val !== "") {
                    removed = true;
                    filled.push(key);
                }
            })

            if (!removed) {
                const newData = [...data].filter((item, i) => i !== nIndex);
                setNumberItems(newData);

                if (nIndex === 0) {
                    changeIndex(0);
                }
                else {
                    changeIndex(nIndex - 1);
                }
            }
            else {
                alert(`Unable to delete: you have data filled at item ${nIndex + 1}. Specifically at: ${filled}`)
            }
        }
    }

    return (
        <div className="number-items">
            <p>Number of Items: {data.length}</p>

            <div id='item-btn'>
                {
                    data.map((item, index) => {
                        const i = index + 1;

                        return (
                            <button key={index}
                                onClick={() => handleChangeItem(index)}
                                className={nIndex === index ? "selected-btn" : ""}
                            >
                                Item {i}
                            </button>
                        )
                    })
                }
                <button onClick={handleAddData}>Add item</button>
                <button onClick={handleDeleteData}>Delete item</button>
            </div>

        </div>
    )
}

export default NumberItems

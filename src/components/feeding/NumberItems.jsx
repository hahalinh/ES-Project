import React from 'react'

function NumberItems({ addData, data, changeIndex, nIndex }) {
    const initial_item = {
        Recipient: "",
        Prey_Item: "",
        Prey_Size: "",
    }

    /**
     * Add 1 more item to NumberItems
     */
    const handleAddData = () => {
        addData(initial_item);
        handleChangeItem(data.length);
    }

    /**
     * Changes the item (including recipient, prey size, prey item) to the specified index in data (NumberItems)
     * @param {*} index 
     */
    const handleChangeItem = (index) => {
        changeIndex(index)
    }

    return (
        <div className="number-items">
            <p>Number of Items: {data.length}</p>

            <div>
                {
                    data.map((item, index) => {
                        const i = index + 1;

                        return (
                            <button key={index}
                                onClick={() => handleChangeItem(index)}
                                className={nIndex === index && "selected-btn"}
                            >
                                Item {i}
                            </button>
                        )
                    })
                }
            </div>

            <div>
                <button onClick={handleAddData}>Add item</button>
            </div>
        </div>
    )
}

export default NumberItems

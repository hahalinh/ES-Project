import React from 'react'

function NumberItems({setNumberItems, data}) {
    return (
        <div className="number-items">
            <p>Number of Items: {data}</p>
            <input placeholder='other' type='number' onChange={(e) => setNumberItems(e.currentTarget.value)}/>
        </div>
    )
}

export default NumberItems

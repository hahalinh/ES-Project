import React from 'react'
import Button from '../Button'

function NumberItems({setNumberItems}) {
    return (
        <div className="number-items">
            <p>Number of Items</p>
            <Button handleData={setNumberItems} value={1}/>
            <input placeholder='other' type='number' onChange={(e) => setNumberItems(e.currentTarget.value)}/>
        </div>
    )
}

export default NumberItems
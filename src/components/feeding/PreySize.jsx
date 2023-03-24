import React from 'react'
import Button from '../Button'

function PreySize({setPreySize}) {
    return (
        <div className="prey-size">
            <p>Prey Size</p>
            <div className="prey-size-bt">
                <Button handleData={setPreySize} value="1.00" />
                <Button handleData={setPreySize} value="1.25" />
                <Button handleData={setPreySize} value="1.50" />
            </div>
        </div>
    )
}

export default PreySize
import React from 'react'
import Button from './Button'

function PreyItem({setPreyItem}) {
    return (
        <div className="prey-item">
            <p>Prey Item</p>
            <div className="prey-item-bt">
                <Button handleData={setPreyItem} value="H"/>
                <Button handleData={setPreyItem} value="HR"/>
                <Button handleData={setPreyItem} value="R"/>
                <Button handleData={setPreyItem} value="T"/>
            </div>
        </div>
    )
}

export default PreyItem
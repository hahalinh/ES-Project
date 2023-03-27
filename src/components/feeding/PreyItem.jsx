import React from 'react'
import Button from '../Button'

function PreyItem({setPreyItem, data}) {
    return (
        <div className="prey-item">
            <p>Prey Item: {data}</p>
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

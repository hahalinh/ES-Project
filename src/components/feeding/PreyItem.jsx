import React from 'react'
import Button from '../Button'
import { useState } from 'react'

function PreyItem({setPreyItem, data}) {
    const [preyI, setPreyI] = useState(["H", "U", "R", "S", "UF", "A", "HD", "T", "H or R", "E"]);

    const addPreyIOption = (data) => {
        setPreyI([...preyI, data]);
    }

    return (
        <div className="prey-item">
            <p>Prey Item: {data}</p>
            <div className="prey-item-bt">
                {
                    preyI.map((item, index) => {
                        return (
                            <Button key={index} 
                            value={item} 
                            handleData={setPreyItem}
                            selected={item === data}
                            />
                        )
                    })
                }
                <Button handleData={setPreyItem} value=""/>
            </div>
        </div>
    )
}

export default PreyItem

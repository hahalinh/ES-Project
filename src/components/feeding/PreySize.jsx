import React from 'react'
import Button from '../Button'
import { useState } from 'react'

function PreySize({setPreySize, data}) {
    const [preyS, setPreyS] = useState([1, 1.25, 1.5, -1, 0.25, 2, 0.5, 1.75]) //-1 is U (unknown)

    const addPreySOption = (data) => {
        setPreyS([...preyS, data])
    }

    return (
        <div className="prey-size">
            <p>Prey Size: {data}</p>
            <div className="prey-size-bt">
                {
                    preyS.map((item, index) => {
                        return (
                            <Button key={index} value={item} handleData={setPreySize} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PreySize

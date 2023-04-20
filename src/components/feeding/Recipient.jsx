import React from 'react'
import Button from '../Button'
import { useState } from 'react'

function Recipient({ setRecipient, data }) {
    const [recip, setRecip] = useState(["A", "A1", "B", "UC", "U", "K", "O", "S", "M", "Y"])

    const addRecipOption = (data) => {
        setRecip([...recip, data])
    }

    return (
        <div className="recipient">
            <p>Recipient: {data}</p>
            <div className="recipient-bt">
                {
                    recip.map((item, index) => {
                        return (
                            <Button key={index} value={item} handleData={setRecipient} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Recipient

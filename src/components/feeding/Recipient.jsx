import React from 'react'
import Button from '../Button'

function Recipient({setRecipient, data}) {
    return (
        <div className="recipient">
            <p>Recipient: {data}</p>
            <div className="recipient-bt">
                <Button handleData={setRecipient} value="A"/>
                <Button handleData={setRecipient} value="B"/>
                <Button handleData={setRecipient} value="C"/>
                <Button handleData={setRecipient} value="A1"/>
            </div>
        </div>
    )
}

export default Recipient

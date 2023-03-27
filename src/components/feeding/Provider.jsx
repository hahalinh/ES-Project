import React from 'react'
import Button from '../Button';

function Provider({ setProvider, data }) {
    return (
        <div className="provider">
            <p>Provider: {data}</p>
            <div className="provider-bt">
                <Button handleData={setProvider} value="P1" />
                <Button handleData={setProvider} value="P2" />
            </div>
        </div>
    )
}

export default Provider

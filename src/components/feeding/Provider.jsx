import React from 'react'
import Button from '../Button';
import { useState } from 'react';

function Provider({ setProvider, data }) {
    const [provid, setprovid] = useState(["A", "A1", "B", "UC", "U", "K", "O", "S", "M", "Y"])

    const addProvidOption = (data) => {
        setprovid([...provid, data])
    }

    return (
        <div className="provider">
            <p>Provider: {data}</p>
            <div className="provider-bt">
                {
                    provid.map((item, index) => {
                        return (
                            <Button value={item} key={index} handleData={setProvider} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Provider

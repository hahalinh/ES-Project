import React, { useState } from 'react'
import Button from '../Button';

function Nest({ setNest, data }) {
    const [nests, setNests] = useState(["P1", "P2"]);

    return (
        <div className="nest">
            <p>Nest: {data}</p>
            <div className="nest-bt">
                {
                    nests.map((item, index) =>
                        <Button handleData={setNest} value={item} key={index} />)
                }
            </div>
        </div>
    )
}

export default Nest

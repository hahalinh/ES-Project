import React from 'react'
import Button from '../Button';

function Nest({setNest, data}) {

    return (
        <div className="nest">
            <p>Nest: {data}</p>
            <div className="nest-bt">
                <Button handleData={setNest} value="P1"/>
                <Button handleData={setNest} value="P2"/>
            </div>
        </div>
    )
}

export default Nest

import React from 'react'
import Button from './Button';

function Nest({setNest}) {

    return (
        <div className="nest">
            <p>Nest</p>
            <div className="nest-bt">
                <Button handleData={setNest} value="P1"/>
                <Button handleData={setNest} value="P2"/>
            </div>
        </div>
    )
}

export default Nest
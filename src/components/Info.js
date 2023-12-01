import React from 'react'
import './Info.css'

function Info(props) {
    return (props.trigger) ? (
        <div className='info'>
            <div className='info-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>x</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Info
import React from 'react'

function Button({ handleData, value, type }) {

    return (
        <input onClick={(e) => handleData(e.currentTarget.value)}
            value={value} type={type ? type : "button"}
        />
    )
}

export default Button
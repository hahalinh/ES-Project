import React from 'react'

/**
 * Returns a button which handle input
 * @param {*} param0 
 * @returns 
 */
function Button({ handleData, value, type, className }) {

    return (
        <input onClick={(e) => handleData(e.currentTarget.value)}
            value={value} type={type ? type : "button"} className={className}
        />
    )
}

export default Button
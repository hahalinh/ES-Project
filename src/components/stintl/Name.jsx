import React from 'react'
import { useState } from 'react'

function Name({ setName, data }) {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
  })
  
  const handleChange = (e, type) => {
    const val = e.currentTarget.value
    type === "first" ? setInput({...input, firstName: val}) : setInput({...input, lastName: val});
    setName(val, type);
  }

  return (
    <div>
      <p>First name: {data.first}</p>
      <input onChange={(e) => handleChange(e, "first")} value={input.firstName} placeholder="First name"/>

      <p>Last name: {data.last}</p>
      <input onChange={(e) => handleChange(e, "last")} value={input.lastName} placeholder="Last name"/>
    </div>
  )
}

export default Name
import React from 'react'
import { useState } from 'react'

function Island({ setIsland, data }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.currentTarget.value);
    setIsland(e.currentTarget.value);
  }

  return (
    <div>
      <p>Island: {data}</p>
      <input onChange={(e) => handleChange(e)} value={input} placeholder="Island" />
    </div>
  )
}

export default Island
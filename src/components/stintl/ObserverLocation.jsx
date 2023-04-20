import React from 'react'
import { useState } from 'react';

function ObserverLocation({setObs, data}) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.currentTarget.value);
    setObs(e.currentTarget.value);
  }

  return (
    <div>
      <p>Observer location: {data}</p>
      <input onChange={(e) => handleChange(e)} value={input} placeholder="Observer location" />
    </div>
  )
}

export default ObserverLocation
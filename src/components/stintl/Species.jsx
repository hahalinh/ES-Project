import React from 'react'
import Button from '../Button'
import { useState } from 'react'

function Species({setSpecies, data}) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.currentTarget.value);
    setSpecies(e.currentTarget.value);
  }

  return (
    <div>
      <p>Species: {data}</p>
      <Button handleData={setSpecies} value="ARTE"/>
      <Button handleData={setSpecies} value="COTE"/>
      <input onChange={(e) => handleChange(e)} value={input} placeholder="Other" className="input-field"/>
    </div>
  )
}

export default Species
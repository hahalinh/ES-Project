import React from 'react'
import Button from '../Button';

function Name({ setName, data }) {
  const dropdownValues = ["Fill", "In", "These", "Values"];

  return (
    <div>
      <p>Name: {data.first}</p>
      <Button handleData={setName} value="drop-down" dropdownValues={dropdownValues} />
    
      </div>
  )
}

export default Name
import React from 'react'
import Button from '../Button';

function Island({ setIsland, data }) {
  const dropdownValues = ["Fill", "In", "These", "Values"];

  return (
    <div>
      <p>Island: {data}</p>
      <Button handleData={setIsland} value="drop-down" dropdownValues={dropdownValues} />
      
    </div>
  )
}

export default Island;

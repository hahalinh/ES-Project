import React from 'react'
import Button from '../Button';

function ObserverLocation({setObs, data}) {
  const dropdownValues = ["Fill", "In", "These", "Values"];

  return (
    <div>
      <p>Observer location: {data}</p>
      <Button handleData={setObs} value="drop-down" dropdownValues={dropdownValues} />
    </div>
  )
}

export default ObserverLocation;
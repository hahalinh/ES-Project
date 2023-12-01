import React from 'react'
import { useState } from 'react';
import Button from '../Button';

function ObserverLocation({setObs, data}) {
  var obs_list = [""];

  const tmp = localStorage.getItem("ObserverLocation");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
    console.log("ObserverLocation.jsx: " + JSON.stringify(tmp_) + "\t data type: " + typeof(tmp_) + "\t" + tmp_[0] + "\t" + typeof(tmp_[0]) + "\t" + tmp_[-1]);
    obs_list = Array.from(tmp_);
  }

  const [dropdownValues, setDropdownValues] = useState(obs_list);
  // const dropdownValues = ["Fill", "In", "These", "Values"];

  return (
    <div>
      <p>Observer location: {data}</p>
      <Button handleData={setObs} value="drop-down" dropdownValues={dropdownValues} />
    </div>
  )
}

export default ObserverLocation;

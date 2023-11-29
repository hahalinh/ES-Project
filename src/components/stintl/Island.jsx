import React from 'react'
import { useState } from 'react';
import Button from '../Button';

function Island({ setIsland, data }) {
  var island_list = [""];

  const tmp = localStorage.getItem("Island");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
    console.log("Name.jsx: " + JSON.stringify(tmp_) + "\t data type: " + typeof(tmp_) + "\t" + tmp_[0] + "\t" + typeof(tmp_[0]) + "\t" + tmp_[-1]);
    island_list = Array.from(tmp_);
  }

  const [dropdownValues, setDropdownValues] = useState(island_list);
  // const dropdownValues = ["Fill", "In", "These", "Values"];

  return (
    <div>
      <p>Island: {data}</p>
      <Button handleData={setIsland} value="drop-down" dropdownValues={dropdownValues} />
      
    </div>
  )
}

export default Island;

import React from 'react'
import { useState } from 'react';
import Button from '../Button';

function Island({ setIsland, data }) {
  var island_list = [""];

  const tmp = localStorage.getItem("Island");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
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

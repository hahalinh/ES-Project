import React from 'react'
import { useState } from 'react';
import Button from '../Button';
import '../../App.css'

function Name({ setName, data }) {
  var name_list = [""];

  const tmp = localStorage.getItem("Name");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
    name_list = Array.from(tmp_);
  }

  const [dropdownValues, setDropdownValues] = useState(name_list);
  // const dropdownValues = ["Fill", "In", "These", "Values"];

  return (
    <div>
      <p>Name: {data.first}</p>
      <Button handleData={setName} value="drop-down" dropdownValues={dropdownValues} className='stint-select-btn'/>
      </div>
  )
}

export default Name
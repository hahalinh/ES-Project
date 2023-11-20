import React, { useState } from 'react';
import Button from '../Button';

function Nest({ setNest, data }) {
  const first_k_ele = 10;
  var nest_list = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20"];

  const tmp = localStorage.getItem("Nest");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
    console.log("Nest.jsx: " + JSON.stringify(tmp_) + "\t data type: " + typeof(tmp_) + "\t" + tmp_[0] + "\t" + typeof(tmp_[0]) + "\t" + tmp_[-1]);
    nest_list = Array.from(tmp_);
  }
  
  const [nests, setNests] = useState(nest_list.slice(0, first_k_ele));
  const [dropdownValues, setDropdownValues] = useState(nest_list.slice(first_k_ele));

  return (
    <div className="nest">
      <p>Nest: {data}</p>
      <div className="nest-bt">
        {nests.map((item, index) => (
          <Button
            handleData={setNest}
            value={item}
            key={index}
            selected={item === data}
          />
        ))}
        <Button handleData={setNest} value="" />
        <Button handleData={setNest} value="drop-down" dropdownValues={dropdownValues} />

      </div>
    </div>
  );
}

export default Nest;

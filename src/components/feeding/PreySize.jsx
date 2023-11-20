import React from 'react';
import Button from '../Button';
import { useState } from 'react';

function PreySize({ setPreySize, data }) {
  const first_k_ele = 10;
  var preySize_list = ["0.25", "0.5", "0.75", "1", "1.25", "1.5", "1.75", "2","Unknown", "2.25", "2.5", "2.75", "3", "3.25"];

  const tmp = localStorage.getItem("PreySize");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
    console.log("PreySize.jsx: " + JSON.stringify(tmp_) + "\t data type: " + typeof(tmp_) + "\t" + tmp_[0] + "\t" + typeof(tmp_[0]) + "\t" + tmp_[-1]);
    preySize_list = Array.from(tmp_);
  }

  const [preySizes, setPreySizes] = useState(preySize_list.slice(0, first_k_ele));
  const [dropdownValues, setDropdownValues] = useState(preySize_list.slice(first_k_ele));

  // const [preySizes, setPreySizes] = useState(["0.25", "0.5", "0.75", "1", "1.25", "1.5", "1.75", "2","Unknown"]);
  // const dropdownValues = ["2.25", "2.5", "2.75", "3", "3.25"];

  const addPreySizeOption = (data) => {
    setPreySizes([...preySizes, data]);
  };

  return (
    <div className="prey-size">
      <p>Prey Size: {data}</p>
      <div className="prey-size-bt">
        {preySizes.map((item, index) => {
          return (
            <Button
              key={index}
              value={item}
              handleData={setPreySize}
              selected={data === item}
            />
          );
        })}
        <Button handleData={setPreySize} value="" />
        <Button handleData={setPreySize} value="drop-down" dropdownValues={dropdownValues} />

      </div>
    </div>
  );
}

export default PreySize;

import React from 'react';
import Button from '../Button';
import { useState } from 'react';

function PreySize({ setPreySize, data }) {
  const [preySizes, setPreySizes] = useState(["1", "1.25", "1.5", "Unknown", "0.25", "2", "0.5", "1.75"]);

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
      </div>
    </div>
  );
}

export default PreySize;

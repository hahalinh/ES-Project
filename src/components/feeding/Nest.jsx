import React, { useState } from 'react';
import Button from '../Button';

function Nest({ setNest, data }) {
  const [nests, setNests] = useState(["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"]);

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
      </div>
    </div>
  );
}

export default Nest;

import React from 'react';
import Button from '../Button';
import { useState } from 'react';

function Provider({ setProvider, data }) {
  const [providers, setProviders] = useState(["BA", "BL", "BR", "FR", "S", "U", "UA", "UB", "UC", "X"]);
  
  const dropdownValues = ["P1", "P2", "P3", "P4", "P5"];

  const addProviderOption = (data) => {
    setProviders([...providers, data]);
  };

  return (
    <div className="provider">
      <p>Provider: {data}</p>
      <div className="provider-bt">
        {providers.map((item, index) => (
          <Button
            key={index}
            value={item}
            handleData={setProvider}
            selected={item === data}
          />
        ))}
        <Button handleData={setProvider} value="" />
        <Button handleData={setProvider} value="drop-down" dropdownValues={dropdownValues} />

      </div>
    </div>
  );
}

export default Provider;

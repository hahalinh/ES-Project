import React from 'react';
import Button from '../Button';
import { useState } from 'react';

function Provider({ setProvider, data }) {
  const [providers, setProviders] = useState([
    "A", "A1", "B", "UC", "U", "K", "O", "S", "M", "Y"
  ]);

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
      </div>
    </div>
  );
}

export default Provider;

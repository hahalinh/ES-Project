import React from 'react';
import Button from '../Button';
import { useState } from 'react';

function Provider({ setProvider, data }) {
  const first_k_ele = 10;
  var provider_list = ["BA", "BL", "BR", "FR", "S", "U", "UA", "UB", "UC", "X", "AA", "AB", "BMB", "KF", "KM","SMB", "TA"];

  const tmp = localStorage.getItem("Provider");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
    console.log("Provider.jsx: " + JSON.stringify(tmp_) + "\t data type: " + typeof(tmp_) + "\t" + tmp_[0] + "\t" + typeof(tmp_[0]) + "\t" + tmp_[-1]);
    provider_list = Array.from(tmp_);
  }

  const [providers, setProviders] = useState(provider_list.slice(0, first_k_ele));
  const [dropdownValues, setDropdownValues] = useState(provider_list.slice(first_k_ele));

  // const [providers, setProviders] = useState(["BA", "BL", "BR", "FR", "S", "U", "UA", "UB", "UC", "X"]);
  // const dropdownValues = ["AA", "AB", "BMB", "KF", "KM","SMB", "TA"];

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

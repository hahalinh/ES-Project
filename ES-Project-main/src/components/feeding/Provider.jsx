import React from 'react';
import Button from '../Button';
import { useState } from 'react';
import Info from '../Info'

function Provider({ setProvider, data }) {
  const [providers, setProviders] = useState(["BA", "BL", "BR", "FR", "S", "U", "UA", "UB", "UC", "X"]);
  
  const dropdownValues = ["AA", "AB", "BMB", "KF", "KM","SMB", "TA"];

  const addProviderOption = (data) => {
    setProviders([...providers, data]);
  };

  const [ShowInfo, setShowInfo] = useState(false);

  return (
    <div className="provider">
      <p>Provider: {data} <button style={{margin: "0px 0px 0px 10px", height: "38px", width: "40px"}}onClick={() => setShowInfo(true)}>!</button></p>
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



        <Info trigger={ShowInfo} setTrigger = {setShowInfo}>
          <h3>Provider Info</h3>
          <p>UB: Unbanded adult</p>
          <p>X: BBL only banded adult</p>
          <p>FR: Field readable banded adult</p>
          <p>UA: Unkown adult</p>
          <p>L: Self (use when chick feeds iteself)</p>
          <p>T: "Teaser" Bird</p>
        </Info>
      </div>
    </div>
  );
}

export default Provider;

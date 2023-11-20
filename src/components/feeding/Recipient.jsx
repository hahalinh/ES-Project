import React, { useState } from 'react';
import Button from '../Button';
import Info from '../Info'

function Recipient({ setRecipient, data }) {
  const [recip, setRecip] = useState(["A", "A1", "B", "UC", "U", "K", "O", "S", "M", "Y"]);
  const dropdownValues = ["C", "N", "R", "T", "UA"];

  const addRecipOption = (data) => {
    setRecip([...recip, data]);
  };

  const [ShowInfo, setShowInfo] = useState(false);

  return (
    <div className="recipient">
      <p>Recipient: {data} <button style={{margin: "0px 0px 0px 10px", height: "38px", width: "40px"}}onClick={() => setShowInfo(true)}>!</button></p>
      <div className="recipient-bt">
        {recip.map((item, index) => (
          <Button key={index} value={item} handleData={setRecipient} selected={data === item} />
        ))}
        <Button handleData={setRecipient} value="" />
        <Button handleData={setRecipient} value="drop-down" dropdownValues={dropdownValues} />



        <Info trigger={ShowInfo} setTrigger = {setShowInfo}>
          <h3>Recipient Info</h3>
          <p>A:  1st hatched "A" chick (marked on head)</p>
          <p>B:  2nd hatched "B" chick (marked on back)</p>
          <p>C:  3rd hatched "C" chick (marked on breast)</p>
          <p>A1: only chick (chick from 1 egg nest - marked on head)</p>
          <p>Y:  Adopted chick</p>
          <p>UC: Unkown chick</p>
          <p>U:  Known</p>
          <p>K:  Klepto(stolen by another adult)</p>
          <p>M:  Mate</p>
          <p>S:  Self</p>
          <p>UF: Uknown Fish</p>
          <p>UI: Unkown Invert</p>
          <p>T:  Collected by observer</p>
          <p>O:  not eaten (fish dropped at nest)</p>
        </Info>
      </div>
    </div>
  );
}

export default Recipient;

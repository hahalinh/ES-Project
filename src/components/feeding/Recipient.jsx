import React, { useState } from 'react';
import Button from '../Button';

function Recipient({ setRecipient, data }) {
  const first_k_ele = 10;
  var recipient_list = ["A", "A1", "B", "UC", "U", "K", "O", "S", "M", "Y", "C", "N", "R", "T", "UA"];

  const tmp = localStorage.getItem("Recipient");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
    console.log("Recipient.jsx: " + JSON.stringify(tmp_) + "\t data type: " + typeof(tmp_) + "\t" + tmp_[0] + "\t" + typeof(tmp_[0]) + "\t" + tmp_[-1]);
    recipient_list = Array.from(tmp_);
  }

  const [recip, setRecip] = useState(recipient_list.slice(0, first_k_ele));
  const [dropdownValues, setDropdownValues] = useState(recipient_list.slice(first_k_ele));

  // const [recip, setRecip] = useState(["A", "A1", "B", "UC", "U", "K", "O", "S", "M", "Y"]);
  // const dropdownValues = ["C", "N", "R", "T", "UA"];

  const addRecipOption = (data) => {
    setRecip([...recip, data]);
  };

  return (
    <div className="recipient">
      <p>Recipient: {data}</p>
      <div className="recipient-bt">
        {recip.map((item, index) => (
          <Button key={index} value={item} handleData={setRecipient} selected={data === item} />
        ))}
        <Button handleData={setRecipient} value="" />
        <Button handleData={setRecipient} value="drop-down" dropdownValues={dropdownValues} />

      </div>
    </div>
  );
}

export default Recipient;

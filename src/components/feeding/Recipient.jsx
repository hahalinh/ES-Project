import React, { useState,useEffect } from 'react';
import Button from '../Button';

function Recipient({file, setRecipient, data }) {
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
  const [ShowInfo, setShowInfo] = useState(false);




  const keysArray = recipient_list;
    const value = 0;
    const initialdict = keysArray.reduce((acc, key) =>{
      acc[key] = value;
    return acc;
    },{});
    const [dict,setDict] = useState(initialdict);
  
    useEffect(() => {
    const readCsvAndUpdateDict = () => {
        if(!recipient_list){
          return;
        } else{
        const newDict = {...dict};

            //iterate through the rows
          recipient_list.forEach(element => {
            newDict[element] = (newDict[element] || 0)+1;
            });
            const entries = Object.entries(newDict);
            entries.sort((a, b) => b[1] - a[1]);
            const sortedDict = Object.fromEntries(entries);
            setDict(sortedDict);
          }
      };
  readCsvAndUpdateDict();
  }, [recipient_list]);

  useEffect(() => {
    
  const providersWithCounts = Object.keys(dict).filter(key => dict[key] > 0);
  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  const providersWithoutCounts = upperValues.filter(key => !providersWithCounts.includes(key));
  const sortedKeys = Object.keys(dict);

  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  setProviders(providersWithCounts.slice(0,upperLimit));
  setDropdownValues(sortedKeys.slice(upperLimit));
}, [dict]);
  const addRecipOption = (data) => {
    setRecip([...recip, data]);
  };

  return (
    <div className="recipient">
      <p>Recipient: {data} <button style={{margin: "0px 0px 0px 10px", height: "38px", width: "40px"}}onClick={() => setShowInfo(true)}>?</button></p>
      <div className="recipient-bt">
        {recip.map((item, index) => (
          <Button key={index} value={item} handleData={setRecipient} selected={data === item} />
        ))}
        <Button handleData={setRecipient} value="" />
        <Button handleData={setRecipient} value="drop-down" dropdownValues={dropdownValues} />
        <Info trigger={ShowInfo} setTrigger = {setShowInfo}>
          <h3>Recipient Info</h3>
          <div style={{ height: '500px', overflowY: 'scroll' }}>
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
          </div>
        </Info>
      </div>
    </div>
  );
}

export default Recipient;
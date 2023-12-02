import React, { useState,useEffect } from 'react';
import Button from '../Button';
import Info from '../Info';
import Papa from "papaparse";

function Recipient({file, setRecipient, data }) {
  const first_k_ele = 10;
  var recipient_list = ["A", "A1", "B", "UC", "U", "K", "O", "S", "M", "Y", "C", "N", "R", "T", "UA"];
  const upperLimit = 10;
  const tmp = localStorage.getItem("Recipient");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
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
        // Replace this with the actual path to your CSV or use a file input
        if(!file){
            return;
          }else{
            Papa.parse(file, {
              header: true,
              complete: (results) => {
                const newDict = { ...dict };
                //iterate through the rows
                results.data.forEach(row => {
                  const item = row['Recipient'];
                  if (item && newDict.hasOwnProperty(item)) {
                    newDict[item] += 1;
                  }
                });
                const entries = Object.entries(newDict);
                entries.sort((a, b) => b[1] - a[1]);
                const sortedDict = Object.fromEntries(entries);
                setDict(sortedDict)
              }
            });
          }
            
  
      };
  
      readCsvAndUpdateDict();
    }, []);

    useEffect(() => {
      const sortedProviders = Object.entries(dict)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);
  
      setRecip(sortedProviders.slice(0, upperLimit));
      setDropdownValues(sortedProviders.slice(upperLimit));
    }, [dict, upperLimit]);
  const addRecipOption = (data) => {
    setRecip([...recip, data]);
  };
  const recipientInfo = [
    "A: 1st hatched \"A\" chick (marked on head)",
    "B: 2nd hatched \"B\" chick (marked on back)",
    "C: 3rd hatched \"C\" chick (marked on breast)",
    "A1: only chick (chick from 1 egg nest - marked on head)",
    "Y: Adopted chick",
    "UC: Unkown chick",
    "U: Known",
    "K: Klepto(stolen by another adult)",
    "M: Mate",
    "S: Self",
    "UF: Uknown Fish",
    "UI: Unkown Invert",
    "T: Collected by observer",
    "O: not eaten (fish dropped at nest)"
  ].sort();

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
              {recipientInfo.map((info, index) => (
                <p key={index}>{info}</p>
              ))}
          </div>
        </Info>
      </div>
    </div>
  );
}

export default Recipient;
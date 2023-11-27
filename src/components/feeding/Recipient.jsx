import React, { useState,useEffect } from 'react';
import Button from '../Button';
import Papa from "papaparse";
import StintData from '../StintData';
import FeedingData from '../FeedingData';

function Recipient({file, setRecipient, data }) {
  const [upperValues, setupperValues] = useState([]);
  //["A", "A1", "B", "UC", "U", "K", "O", "S", "M", "Y"];
  const upperLimit = 10;
  const [dropdownValues,setDropdownValues] = useState([]);
  //["C", "N", "R", "T", "UA"];
  const [recip,setRecip] = useState(upperValues);
 
  const keysArray = file;
  const value = 0;
  const initialdict = keysArray.reduce((acc, key) =>{
    acc[key] = value;
   return acc;
  },{});
  const [dict,setDict] = useState(initialdict);
  

  //it is instead using a format
  // const testarry = ["1","2","3","4","4"];
  // const testarry2= ["1","3","4","5","6"];
  //4 should be top
  //then 3
  //or 1
  //then 5
  // or 2
  // or 6
  // const combined = [...testarry, ...testarry2];
  //on save file it should read it.
  //then update button order
  //dict["1"] = (dict["1"] || 0) + 1;
  


  
  useEffect(() => {
    const readCsvAndUpdateDict = () => {
        if(!file){
          return;
        } else{
        const newDict = {...dict};

            //iterate through the rows
          file.forEach(element => {
            newDict[element] = (newDict[element] || 0)+1;
            });
            const entries = Object.entries(newDict);
            entries.sort((a, b) => b[1] - a[1]);
            const sortedDict = Object.fromEntries(entries);
            setDict(sortedDict);
          }
      };
  readCsvAndUpdateDict();
}, [file]);


  useEffect(() => {
    
    const providersWithCounts = Object.keys(dict).filter(key => dict[key] > 0);
  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  const providersWithoutCounts = upperValues.filter(key => !providersWithCounts.includes(key));
  const sortedKeys = Object.keys(dict);
  
  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  
  
  setRecip(providersWithCounts.slice(0,upperLimit));
  
  setDropdownValues(sortedKeys.slice(upperLimit));
  }, [dict]);


  //const sortedAsc = [...dict].sort((a,b)=>a.id-b.id);
  //sort the dictionary
  //const maxKey = Object.keys(dict).reduce((a, b) => dict[a] > dict[b] ? a : b);
  //const maxVal = dict[maxKey];
  
  // const entries = Object.entries(dict);
  // const values = Object.keys(dict);
   //values.sort((x,y) => y[1] - x[1]);
   ///entries.sort((x,y) => y[1] - x[1]);
  // const arrSort = entries.map(entry => entry[1]);
   
  return (
    <div className="recipient">
      <p>Recipient: {data}</p>
      <p>{StintData.file}</p>
      {/* <ul>{Object.entries(dict).map(([key,value])=>(
                <li key={key}>{key}:{value}</li>
            ))}</ul> */}
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
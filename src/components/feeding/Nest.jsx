import React, { useState, useEffect } from 'react';
import Button from '../Button';
import Papa from "papaparse";


function Nest({file, setNest, data}) {
  const first_k_ele = 10;
  var nest_list = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20"];
  const upperLimit = 10;
  const tmp = localStorage.getItem("Nest");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
    console.log("Nest.jsx: " + JSON.stringify(tmp_) + "\t data type: " + typeof(tmp_) + "\t" + tmp_[0] + "\t" + typeof(tmp_[0]) + "\t" + tmp_[-1]);
    nest_list = Array.from(tmp_);
  }
  
  //parse csv data
  
  
  const [nests, setNests] = useState(nest_list.slice(0, first_k_ele));
  const [dropdownValues, setDropdownValues] = useState(nest_list.slice(first_k_ele));
 
  const keysArray = nest_list;
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
                const item = row['Nest'];
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

    setNests(sortedProviders.slice(0, upperLimit));
    setDropdownValues(sortedProviders.slice(upperLimit));
  }, [dict, upperLimit]);

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
        <Button handleData={setNest} value="drop-down" dropdownValues={dropdownValues} />

      </div>
    </div>
  );
}

export default Nest;

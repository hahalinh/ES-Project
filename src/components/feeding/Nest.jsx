import React, { useState, useEffect } from 'react';
import Button from '../Button';
import Papa from "papaparse";

function Nest({file, setNest, data }) {
  //why use state here we can create an array and then pass it to useState
  const upperValues = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"];
  const dropdownValues = ["P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20"];
  const [nests,setNests] = useState(upperValues);
  //purpose of setNests? omitted.
  //using a map
  

  //test with some csvs and just use papaparse
  const initialdict = {
    "P1":0,"P2":0,"P3":0,"P4":0,
    "P5":0,"P6":0,"P7":0,"P8":0,
    "P9":0,"P10":0,"P11":0,"P12":0,
    "P13":0,"P14":0,"P15":0,"P16":0,
    "P17":0,"P18":0,"P19":0,"P20":0
  };
  const [dict, setDict] = useState(initialdict);
  
  useEffect(() => {
    const readCsvAndUpdateDict = () => {
      //be replaced with the input from
      //quans part
      //maybe I add a section where
      if(file!=null){
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
              //sorts in acending order
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
    const providersWithCounts = Object.keys(dict).filter(key => dict[key] > 0);
  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  const providersWithoutCounts = upperValues.filter(key => !providersWithCounts.includes(key));
  setNests([...providersWithCounts, ...providersWithoutCounts]);
  }, [dict]);


  //const maxKey = Object.keys(dict).reduce((a, b) => dict[a] > dict[b] ? a : b);
  //const maxVal = dict[maxKey];
  //we should re order completely by the numbers
  //we can make a dictionary to store the count of each button's usage.

  //const nest_counter = 0;
  //not final it should update the code

  //so we want to keep a count for each button 
  //on press to increase the counter only if save file is pressed. 
  //and lock the data in until its finalized and append to pdf
  return (
    <div className="nest">
      <p>Nest: {data}</p>
      {/* <ul>{Object.entries(dict).map(([key,value])=>(
                <li key={key}>{key}:{value}</li>
            ))}</ul> */}
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

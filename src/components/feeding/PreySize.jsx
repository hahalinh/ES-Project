import React from 'react';
import Button from '../Button';
import { useState, useEffect } from 'react';
import Papa from "papaparse";

function PreySize({ setPreySize, data }) {
  const upperValues = ["0.25", "0.5", "0.75", "1", "1.25", "1.5", "1.75", "2","Unknown"];
  const dropdownValues = ["2.25", "2.5", "2.75", "3", "3.25"];
  const [preySizes, setPreySizes] = useState(upperValues);
  const initialdict = {
  "0.25":0, "0.5":0, "0.75":0, 
  "1":0, "1.25":0, "1.5":0, 
  "1.75":0, "2":0,"Unknown":0,
  "2.25":0, "2.5":0, "2.75":0, 
  "3":0, "3.25":0};

  const [dict, setDict] = useState(initialdict);
  const maxKey = Object.keys(dict).reduce((a, b) => dict[a] > dict[b] ? a : b);
  const maxVal = dict[maxKey];

  useEffect(() => {
    const readCsvAndUpdateDict = () => {
      // Replace this with the actual path to your CSV or use a file input
      const file = '/test.csv'; 
      fetch(file)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            header: true,
            complete: (results) => {
              const newDict = { ...dict };
              //iterate through the rows
              results.data.forEach(row => {
                const item = row['Prey_Size'];
                if (item && newDict.hasOwnProperty(item)) {
                  newDict[item] += 1;
                }
              });
              setDict(newDict)
            }
          });
          
        })
       
    };

    readCsvAndUpdateDict();
  }, []);


  const addPreySizeOption = (data) => {
    setPreySizes([...preySizes, data]);
  };

  return (
    <div className="prey-size">
      <p>Prey Size: {data}</p>
      
      <div className="prey-size-bt">
        {preySizes.map((item, index) => {
          return (
            <Button
              key={index}
              value={item}
              handleData={setPreySize}
              selected={data === item}
            />
          );
        })}
        <Button handleData={setPreySize} value="" />
        <Button handleData={setPreySize} value="drop-down" dropdownValues={dropdownValues} />

      </div>
    </div>
  );
}

export default PreySize;

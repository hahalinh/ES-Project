import React from 'react';
import Button from '../Button';
import { useState, useEffect } from 'react';
import Papa from "papaparse";

function Provider({file, setProvider, data }) {
  const upperValues = ["BA", "BL", "BR", "FR", "S", "U", "UA", "UB", "UC", "X"];
  const dropdownValues = ["AA", "AB", "BMB", "KF", "KM","SMB", "TA"];
  const [providers, setProviders] = useState(upperValues);
  
  const initialdict = {
  };
  //grab data from local storage,
  
  const [dict,setDict] = useState(initialdict)

  useEffect(() => {
    const readCsvAndUpdateDict = () => {
      // Replace this with the actual path to your CSV or use a file input
      if(file!=null){
          return;
        }else{
          Papa.parse(file, {
            header: true,
            complete: (results) => {
              const newDict = { ...initialdict };
              //iterate through the rows
              results.data.forEach(row => {
                const item = row['Provider'];
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
    const providersWithCounts = Object.keys(dict).filter(key => dict[key] > 0);
  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  const providersWithoutCounts = upperValues.filter(key => !providersWithCounts.includes(key));
  //remove from drop down
  if(providersWithCounts.includes()){
    dropdownValues.pop();
  }
  
  setProviders([...providersWithCounts, ...providersWithoutCounts]);
  }, [dict]); 
  

  return ( 
    <div className="provider">
      <p>Provider: {data}</p>
      {/* <p>{dropdownValues}</p> */}
      {/* <p>{upperValues}</p> */}
      {/* <ul>{Object.entries(dict).map(([key,value])=>(
                <li key={key}>{key}:{value}</li>
            ))}</ul> */}
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

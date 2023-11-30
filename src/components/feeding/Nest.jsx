import React, { useState, useEffect } from 'react';
import Button from '../Button';


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
        if(!nest_list){
          return;
        } else{
        const newDict = {...dict};

            //iterate through the rows
          nest_list.forEach(element => {
            newDict[element] = (newDict[element] || 0)+1;
            });
            const entries = Object.entries(newDict);
            entries.sort((a, b) => b[1] - a[1]);
            const sortedDict = Object.fromEntries(entries);
            setDict(sortedDict);
          }
      };
  readCsvAndUpdateDict();
}, [nest_list]);

useEffect(() => {
    
  const providersWithCounts = Object.keys(dict).filter(key => dict[key] > 0);
  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  const providersWithoutCounts = nest_list.filter(key => !providersWithCounts.includes(key));
  const sortedKeys = Object.keys(dict);

  providersWithCounts.sort((a, b) => dict[b] - dict[a]);

  setNests(providersWithCounts.slice(0,upperLimit));
  setDropdownValues(sortedKeys.slice(upperLimit));
  }, [dict]);

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

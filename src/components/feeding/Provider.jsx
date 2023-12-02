import React from 'react';
import Button from '../Button';
import { useState, useEffect } from 'react';
import Info from '../Info';
import Papa from "papaparse";

function Provider({file, setProvider, data }) {
  const first_k_ele = 10;
  var provider_list = ["BA", "BL", "BR", "FR", "S", "U", "UA", "UB", "UC", "X", "AA", "AB", "BMB", "KF", "KM","SMB", "TA"];
  // const [providers, setProviders] = useState(["BA", "BL", "BR", "FR", "S", "U", "UA", "UB", "UC", "X"]);
  // const dropdownValues = ["AA", "AB", "BMB", "KF", "KM","SMB", "TA"];
  const upperLimit = 10;
  const tmp = localStorage.getItem("Provider");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
    console.log("Provider.jsx: " + JSON.stringify(tmp_) + "\t data type: " + typeof(tmp_) + "\t" + tmp_[0] + "\t" + typeof(tmp_[0]) + "\t" + tmp_[-1]);
    provider_list = Array.from(tmp_);
  }

  const [providers, setProviders] = useState(provider_list.slice(0, first_k_ele));
  const [dropdownValues, setDropdownValues] = useState(provider_list.slice(first_k_ele));
  const [ShowInfo, setShowInfo] = useState(false);

  const keysArray = provider_list;
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
    const sortedProviders = Object.entries(dict)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    setProviders(sortedProviders.slice(0, upperLimit));
    setDropdownValues(sortedProviders.slice(upperLimit));
  }, [dict, upperLimit]);


  const addProviderOption = (data) => {
    setProviders([...providers, data]);
  };

  return (
    <div className="provider">
      
      <p>Provider: {data} <button style={{margin: "0px 0px 0px 10px", height: "38px", width: "40px"}}onClick={() => setShowInfo(true)}>?</button></p>
      
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
                <Info trigger={ShowInfo} setTrigger = {setShowInfo}>
          <h3>Provider Info</h3>
          <div style={{ height: '500px', overflowY: 'scroll' }}>
          <p>AA: Adult A</p>
          <p>AB: Adult B</p>
          <p>BA: Banded Adult</p>
          <p>BL: Banded Left</p>
          <p>BMB: Breat marked bird</p>
          <p>BR: Banded Right</p>
          <p>FR: Field readable banded bird</p>
          <p>KF: Known Female</p>
          <p>KM: Known Male</p>
          <p>S: Self</p>
          <p>SMB: Shoulder marked bird</p>
          <p>TA: Teaser Adult</p>
          <p>U: unknown</p>
          <p>Unknown Adult</p>
          <p>UB: Unbanded Adult</p>
          <p>X: BBL only banded adult</p>
          </div>
        </Info>
      </div>
    </div>
  );
}

export default Provider;

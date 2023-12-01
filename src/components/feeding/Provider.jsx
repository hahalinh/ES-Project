import React from 'react';
import Button from '../Button';
import { useState, useEffect } from 'react';
import Info from '../Info';

function Provider({setProvider, data }) {
  const first_k_ele = 10;
  var provider_list = ["BA", "BL", "BR", "FR", "S", "U", "UA", "UB", "UC", "X", "AA", "AB", "BMB", "KF", "KM","SMB", "TA"];
  // const [providers, setProviders] = useState(["BA", "BL", "BR", "FR", "S", "U", "UA", "UB", "UC", "X"]);
  // const dropdownValues = ["AA", "AB", "BMB", "KF", "KM","SMB", "TA"];
  const upperLimit = 10;
  const tmp = localStorage.getItem("Provider");
  if (tmp != null) {
    const tmp_ = JSON.parse(tmp);
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
        if(!provider_list){
          return;
        } else{
        const newDict = {...dict};

            //iterate through the rows
          provider_list.forEach(element => {
            newDict[element] = (newDict[element] || 0)+1;
            });
            const entries = Object.entries(newDict);
            entries.sort((a, b) => b[1] - a[1]);
            const sortedDict = Object.fromEntries(entries);
            setDict(sortedDict);
          }
      };
  readCsvAndUpdateDict();
  }, [provider_list]);

  useEffect(() => {
    
  const providersWithCounts = Object.keys(dict).filter(key => dict[key] > 0);
  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  const providersWithoutCounts = provider_list.filter(key => !providersWithCounts.includes(key));
  const sortedKeys = Object.keys(dict);

  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  setProviders(providersWithCounts.slice(0,upperLimit));
  setDropdownValues(sortedKeys.slice(upperLimit));
}, [dict]);

  const addProviderOption = (data) => {
    setProviders([...providers, data]);
  };
  const providerInfo = [
    "AA: Adult A",
    "AB: Adult B",
    "BA: Banded Adult",
    "BL: Banded Left",
    "BMB: Breast marked bird",
    "BR: Banded Right",
    "FR: Field readable banded bird",
    "KF: Known Female",
    "KM: Known Male",
    "S: Self",
    "SMB: Shoulder marked bird",
    "TA: Teaser Adult",
    "U: unknown",
    "Unknown Adult",
    "UB: Unbanded Adult",
    "X: BBL only banded adult"
  ].sort();
  
  return (
    <div className="provider">
      <p>Provider: {data} <button style={{margin: "0px 0px 0px 10px", height: "38px", width: "40px"}}onClick={() => setShowInfo(true)}>?</button></p>
      
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
                <Info trigger={ShowInfo} setTrigger = {setShowInfo}>
          <h3>Provider Info</h3>
            <div style={{ height: '500px', overflowY: 'scroll' }}>
              {providerInfo.map((info, index) => (
                <p key={index}>{info}</p>
              ))}
          </div>
        </Info>
      </div>
    </div>
  );
}

export default Provider;

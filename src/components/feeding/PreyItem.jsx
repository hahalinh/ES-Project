import React from 'react'
import Button from '../Button'
import { useState, useEffect } from 'react'
import Info from '../Info'

function PreyItem({setPreyItem, data}) {
    const first_k_ele = 10;
    var preyItem_list = ["H", "U", "R", "S", "UF", "A", "HD", "T", "H or R", "E", "ALE", "AS", "B", "BR", "C", "CA", "CH", "CU", "CUS", "D", "DR", "EEL", "EP", "EW", "F", "FS", "G", "GH", "I", "J", "K", "KF", "L", "LA/H", "LA/HD", "LA/R", "LA/S", "LA/UF", "M", "MF", "O", "P", "PL", "PS", "PUF", "Q", "RF", "RG", "ROS", "RS", "SB", "SH", "SM", "SN", "SP", "SS", "SY", "T", "TC", "U", "UF1", "UF1-SI2016", "UFEER2016", "UF-PI2017", "UFSI2015", "UG", "LA/UF", "UI", "V", "W", "X", "Y", "Z"];
    const upperLimit = 10;
    const tmp = localStorage.getItem("PreyItem");
    if (tmp != null) {
        const tmp_ = JSON.parse(tmp);
        console.log("PreyItem.jsx: " + JSON.stringify(tmp_) + "\t data type: " + typeof(tmp_) + "\t" + tmp_[0] + "\t" + typeof(tmp_[0]) + "\t" + tmp_[-1]);
        preyItem_list = Array.from(tmp_);
    }

    const [preyI, setPreyI] = useState(preyItem_list.slice(0, first_k_ele));
    const [dropdownValues, setDropdownValues] = useState(preyItem_list.slice(first_k_ele));

    // const [preyI, setPreyI] = useState(["H", "U", "R", "S", "UF", "A", "HD", "T", "H or R", "E"]);
    // const dropdownValues = ["ALE", "AS", "B", "BR", "C", "CA", "CH", "CU", "CUS", "D", "DR", "EEL", "EP", "EW", "F", "FS", "G", "GH", "I", "J", 
    // "K", "KF", "L", "LA/H", "LA/HD", "LA/R", "LA/S", "LA/UF", "M", "MF", "O", "P", "PL", "PS", "PUF",
    // "Q", "RF", "RG", "ROS", "RS", "SB", "SH", "SM", "SN", "SP", "SS", "SY", "T", "TC", "U", "UF1", "UF1-SI2016", 
    // "UFEER2016", "UF-PI2017", "UFSI2015", "UG", "LA/UF", "UI", "V", "W", "X", "Y", "Z"];
    const keysArray = preyItem_list;
    const value = 0;
    const initialdict = keysArray.reduce((acc, key) =>{
      acc[key] = value;
    return acc;
    },{});
    const [dict,setDict] = useState(initialdict);
  
    useEffect(() => {
    const readCsvAndUpdateDict = () => {
        if(!preyItem_list){
          return;
        } else{
        const newDict = {...dict};

            //iterate through the rows
          preyItem_list.forEach(element => {
            newDict[element] = (newDict[element] || 0)+1;
            });
            const entries = Object.entries(newDict);
            entries.sort((a, b) => b[1] - a[1]);
            const sortedDict = Object.fromEntries(entries);
            setDict(sortedDict);
          }
      };
  readCsvAndUpdateDict();
  }, [preyItem_list]);

  useEffect(() => {
    
  const providersWithCounts = Object.keys(dict).filter(key => dict[key] > 0);
  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  const providersWithoutCounts = preyItem_list.filter(key => !providersWithCounts.includes(key));
  const sortedKeys = Object.keys(dict);

  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  setPreyI(providersWithCounts.slice(0,upperLimit));
  setDropdownValues(sortedKeys.slice(upperLimit));
}, [dict]);

    const addPreyIOption = (data) => {
        setPreyI([...preyI, data]);
    }
    const preyItemInfo = [
        "A: Amphipod",
        "ALE: Alewife",
        "J: Ant",
        "AS: Artic Shanny",
        "MF: Atlantic Moonfish",
        "SY: Atlantic Saury",
        "F: Bluefish",
        "T: Butterfish",
        "CA: Capelin",
        "BL Click Beetle",
        "C: Crustacean",
        "CU: Cunner",
        "DR: Dragonfly",
        "EW: Earthworm",
        "EEL: Eel",
        "EP: Eelpout",
        "E: Euphausiid",
        "FS: Fish Scrap/ Fish chunk or Meat chunk(Bait)",
        "PL: Flower/ Plant Material",
        "BR: Four-bearded Rockling",
        "G: Goosefish",
        "HD: Haddock",
        "H: Hake (white hake and small 4-bearded rockling)",
        "R: Herring/ Cluepeidae",
        "H OR R: Hake or Herring",
        "I: Insect",
        "W: Isopod",
        "KF: Killifish (mummichog)",
        "LA/H: Larval Hake",
        "LA/R: Larval Herring",
        "LA/S: Larval Sandlance",
        "LA/UF: Larval Uknown Fish",
        "L: Lumpfish",
        "Y: Mackerel",
        "M: Moth",
        "CH: Perch",
        "PS: Plant Seed",
        "K: Pollock",
        "P: Polycheate",
        "PUF: Puffer",
        "RF: Redfish",
        "O: Rock Eel",
        "ROS: Rosefish (includes black bellied)",
        "RS: Rough Scad",
        "S: Sand Lance",
        "N: Sculpin",
        "SN: Seasnail",
        "SS: Shore or sand Shrimp",
        "SP: Shrimp",
        "V: Silverside",
        "SH: Silver hake",
        "SM: Smelt",
        "Z: Sniperfish",
        "D: Spider",
        "Q: Squid",
        "X: Stickleback",
        "UG: Unknown Gadoid",
        "U: Unknown"
      ].sort();

    const [ShowInfo, setShowInfo] = useState(false);

    return (//style button give class name 
        <div className="prey-item">
            <p>Prey Item: {data} <button style={{margin: "0px 0px 0px 10px", height: "38px", width: "40px"}}onClick={() => setShowInfo(true)}>?</button></p>
            <div className="prey-item-bt">
                {
                    preyI.map((item, index) => {
                        return (
                            <Button key={index} 
                            value={item} 
                            handleData={setPreyItem}
                            selected={item === data}
                            />
                        )
                    })
                }
                <Button handleData={setPreyItem} value=""/>
                <Button handleData={setPreyItem} value="drop-down" dropdownValues={dropdownValues} />
                
                <Info trigger={ShowInfo} setTrigger = {setShowInfo}>
                    <h3>Prey Item Info</h3>
                    <div style={{ height: '500px', overflowY: 'scroll' }}>
                        {preyItemInfo.map((info, index) => (
                            <p key={index}>{info}</p>
                        ))}
                    </div>
                </Info>
            </div>
        </div>
    );
}

export default PreyItem


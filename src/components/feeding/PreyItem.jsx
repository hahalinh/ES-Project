import React from 'react'
import Button from '../Button'
import { useState, useEffect } from 'react'
import Info from '../Info';
import Papa from "papaparse";

function PreyItem({file, setPreyItem, data}) {
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
                    const item = row['Prey_Item'];
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
    
        setPreyI(sortedProviders.slice(0, upperLimit));
        setDropdownValues(sortedProviders.slice(upperLimit));
      }, [dict, upperLimit]);

    const addPreyIOption = (data) => {
        setPreyI([...preyI, data]);
    }

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
                    <p>A: Amphipod</p>
                    <p>ALE: Alewife</p>
                    <p>J: Ant</p>
                    <p>AS: Artic Shanny</p>
                    <p>MF: Atlantic Moonfish</p>
                    <p>SY: Atlantic Saury</p>
                    <p>F: Bluefish</p>
                    <p>T: Butterfish</p>
                    <p>CA: Capelin</p>
                    <p>BL Click Beetle</p>
                    <p>C: Crustacean</p>
                    <p>CU: Cunner</p>
                    <p>DR: Dragonfly</p>
                    <p>EW: Earthworm</p>
                    <p>EEL: Eel</p>
                    <p>EP: Eelpout</p>
                    <p>E: Euphausiid</p>
                    <p>FS: Fish Scrap/ Fish chunk or Meat chunk(Bait)</p>
                    <p>PL: Flower/ Plant Material</p>
                    <p>BR: Four-bearded Rockling</p>
                    <p>G: Goosefish</p>
                    <p>HD: Haddock</p>
                    <p>H: Hake (white hake and small 4-bearded rockling)</p>
                    <p>R: Herring/ Cluepeidae</p>
                    <p>H OR R: Hake or Herring </p>
                    <p>I: Insect</p>
                    <p>W: Isopod</p>
                    <p>KF: Killifish (mummichog)</p>
                    <p>LA/H: Larval Hake</p>
                    <p>LA/R: Larval Herring</p>
                    <p>LA/S: Larval Sandlance</p>
                    <p>LA/UF: Larval Uknown Fish</p>
                    <p>L: Lumpfish</p>
                    <p>Y: Mackerel</p>
                    <p>M: Moth</p>
                    <p>CH: Perch</p>
                    <p>PS: Plant Seed</p>
                    <p>K: Pollock</p>
                    <p>P: Polycheate</p>
                    <p>PUF: Puffer</p>
                    <p>RF: Redfish</p>
                    <p>O: Rock Eel</p>
                    <p>ROS: Rosefish (includes black bellied)</p>
                    <p>RS: Rough Scad</p>
                    <p>S: Sand Lance</p>
                    <p>N: Sculpin</p>
                    <p>SN: Seasnail</p>
                    <p>SS: Shore or sand Shrimp</p>
                    <p>SP: Shrimp</p>
                    <p>V: Silverside</p>
                    <p>SH: Silver hake</p>
                    <p>SM: Smelt</p>
                    <p>Z: Sniperfish</p>
                    <p>D: Spider</p>
                    <p>Q: Squid</p>
                    <p>X: Stickleback</p>
                    <p>UG: Unknown Gadoid</p>
                    <p>U: Unknown</p>
                    </div>
                </Info>
            </div>
        </div>
    )
}

export default PreyItem


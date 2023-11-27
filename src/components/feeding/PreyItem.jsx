import React from 'react'
import Button from '../Button'
import { useState,useEffect } from 'react'
import Papa from 'papaparse';

//we need to keep papapase
function PreyItem({file, setPreyItem, data}) {
    const upperValues = ["H", "U", "R", "S", "UF", "A", "HD", "T", "H or R", "E"];
    const dropdownValues = ["ALE", "AS", "B", "BR", "C", "CA", "CH", "CU", "CUS", "D", "DR", "EEL", "EP", "EW", "F", "FS", "G", "GH", "I", "J", 
    "K", "KF", "L", "LA/H", "LA/HD", "LA/R", "LA/S", "LA/UF", "M", "MF", "O", "P", "PL", "PS", "PUF",
    "Q", "RF", "RG", "ROS", "RS", "SB", "SH", "SM", "SN", "SP", "SS", "SY", "T", "TC", "U", "UF1", "UF1-SI2016", 
    "UFEER2016", "UF-PI2017", "UFSI2015", "UG", "LA/UF", "UI", "V", "W", "X", "Y", "Z"];
    const [preyI, setPreyI] = useState(upperValues);
    //these values place holder 0 should be taken from csv file
    //if there is no csv file imported make a new count and 
    //add a count to the csv.
    var placeholder = 0;
    //use papa parse
    //read the column headers on the csv file which is the first few and get a count
    //or edit a count from csv file
    //these columns need to added to the csv file.`
    //preyItemSelections: the entire dictionary
    //PreyItemsCount : 0
    //PreySizeCount : 0
    //RecipientCount : 0
    //NestCount : 0
    //ProviderCount : 0
    //that data is passed to the dictionary
    //then find the max value in the dictionary and move it to the top
    //the 0s are placeholders for the actual value passed from csv file.
    const initialDict = {"H":0, "U":0, "R":0, "S":0, "UF":0, "A":0, "HD":0, "T":0, "H or R":0,
    "E":0,"ALE":0, "AS":0, "B":0, "BR":0, "C":0, "CA":0, "CH":0, "CU":0, "CUS":0, "D":0,
    "DR":0, "EEL":0, "EP":0, "EW":0, "F":0, "FS":0, "G":0, "GH":0, "I":0, "J":0, "K":0,
    "KF":0, "L":0, "LA/H":0, "LA/HD":0, "LA/R":0, "LA/S":0, "LA/UF":0, "M":0, "MF":0,
    "O":0, "P":0, "PL":0, "PS":0, "PUF":0,"Q":0, "RF":0, "RG":0, "ROS":0, "RS":0, "SB":0,
    "SH":0, "SM":0, "SN":0, "SP":0, "SS":0, "SY":0, "T":0, "TC":0, "U":0, "UF1":0, "UF1-SI2016":0, 
    "UFEER2016":0, "UF-PI2017":0, "UFSI2015":0, "UG":0, "LA/UF":0, "UI":0, "V":0, "W":0, "X":0, "Y":0, "Z":0};
    const [dict,setDict] = useState(initialDict);
   
   
    useEffect(() => {
      const readCsvAndUpdateDict = () => {
        // Replace this with the actual path to your CSV or use a file input
        if(file!=null){
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
      const providersWithCounts = Object.keys(dict).filter(key => dict[key] > 0);
    providersWithCounts.sort((a, b) => dict[b] - dict[a]);
    const providersWithoutCounts = upperValues.filter(key => !providersWithCounts.includes(key));
    setPreyI([...providersWithCounts, ...providersWithoutCounts]);
    }, [dict]); 
   
    // const entries = Object.entries(dict);
    // entries.sort((x,y) => y[1] - x[1]);
    //currently gets max value for testing 
    //but it should order by numerical counts.
    //var arr = Object.keys(dict).map(function ( key ) { return dict[key]; });
    //or get every key with a value and do it hierarchically
    // const maxKey = Object.keys(dict).reduce((a, b) => dict[a] > dict[b] ? a : b);
    // const maxVal = dict[maxKey];


    const addPreyIOption = (data) => {
        setPreyI([...preyI, data]);
    }

    return (
        <div className="prey-item">
            <p>Prey Item: {data}</p>
            
            <ul>{Object.entries(dict).map(([key,value])=>(
                <li key={key}>{key}:{value}</li>
            ))}</ul>
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

            </div>
        </div>
    )
}

export default PreyItem


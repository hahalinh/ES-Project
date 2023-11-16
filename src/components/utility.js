import { saveAs } from 'file-saver';

export const handleSaveClick = (stint, stintID) => {
    let csv = '';
    let data = stint;
    data.StintID = stintID;
    
    // Check for missing fields
    // const emptyFields = checkForMissingFields(data);
    // if (emptyFields.length > 0) {
    //     alert(`Missing fields:\n${emptyFields.join("\n")}`);
    //     return;
    // }

    // Save file as csv to user's computer
    csv += jsonToCSV(data);
    const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const dowloadName = stintID;
    saveAs(file, dowloadName);

    // Delete local storage
    localStorage.setItem('backupData', null);



}

export const checkForMissingFields = (stint) => {
    const emptyFields = [];
    const excludeKey = ["Comment"]; // this can be missing in data

    // Check for missing fields in stint data
    Object.entries(stint).forEach(([key, value]) => {
        if (value === "" && !excludeKey.includes(key)) {
            emptyFields.push(`Stint: ${key}`);
        }
    });

    // Check for missing fields in feeding data
    stint.feedingData.forEach((feeding, feedingIndex) => {
        Object.keys(feeding).forEach((key) => {
            if (Array.isArray(feeding[key])) {
                feeding[key].forEach((item, itemIndex) => {
                    Object.keys(item).forEach((itemKey) => {
                        if (item[itemKey] === "") {
                            emptyFields.push(
                                `Feeding ${feedingIndex + 1}, Item ${itemIndex + 1}: ${itemKey}`
                            );
                        }
                    });
                });
            } else {
                if (feeding[key] === "" && !excludeKey.includes(key)) {
                    emptyFields.push(`Feeding ${feedingIndex + 1}: ${key}`);
                }
            }
        });
    });

    return emptyFields;
};

export const handleSaveForCloseFeeding = (stint, stintID) => {
    let data = stint;
    data.StintID = stintID;

    let jsonString = JSON.stringify(data);

    // Save the CSV data to localStorage
    localStorage.setItem('backupData', jsonString);
}


/**
 * Converts json data to a string representation of csv
 * @param {*} json 
 * @returns 
 */
const jsonToCSV = (json) => {
    const header = [
        'StintID', 'Stint_Type', 'Island', 'Species', 'Prey_Size_Method', 'Prey_Size_Reference',
        'FirstName', 'LastName', 'Observer_Location', 'Date_Time_Start', 'Date_Time_End', 'Stint_Comment',
        'FeedingID', 'Nest', 'Time_Arrive', 'Time_Depart', 'Provider', 'Recipient', 'Prey_Item', 'Prey_Size',
        'Number_of_Items', 'Plot_Status', 'Feeding_Comment'
    ];
    const csvRows = [header.join(',')];

    json.feedingData.forEach(feeding => {
        feeding.Number_of_Items.forEach(item => {
            //careful with Number_of_Items as it is not an integer anymore but JSON so feeding.Number_of_Items.length
            const row = [
                json.StintID, json.Stint_Type, json.Island, json.Species, json.Prey_Size_Method, json.Prey_Size_Reference,
                json.FirstName, json.LastName, json.Observer_Location, json.Date_Time_Start, json.Date_Time_End, json.Comment,
                feeding.FeedingID, feeding.Nest, feeding.Time_Arrive, feeding.Time_Depart, feeding.Provider, item.Recipient,
                item.Prey_Item, item.Prey_Size, feeding.Number_of_Items.length, feeding.Plot_Status, feeding.Comment
            ];
            csvRows.push(row.join(','));
        });
    });

    return csvRows.join('\n');
};

    /**
     * Converts csv data to stint JSON object
     * @param {*} csv 
     * @returns 
     */
    function csvToJson(csv) {
        const lines = csv.split('\n');
        const dataLines = lines.slice(1);

        const feedingData = [];

        let currentFeedingID = null;
        let currentFeeding = null;
        let currentNumberOfItems = [];

        for (const line of dataLines) {
            const values = line.split(',');
            const feedingID = values[12];

            if (feedingID !== currentFeedingID) {
                if (currentFeedingID !== null) {
                    currentFeeding.Number_of_Items = currentNumberOfItems;
                    feedingData.push(currentFeeding);
                }
                currentFeedingID = feedingID;
                currentFeeding = {
                    FeedingID: feedingID,
                    Nest: values[13],
                    Time_Arrive: values[14],
                    Time_Depart: values[15],
                    Provider: values[16],
                };
                currentNumberOfItems = [];
            }

            currentNumberOfItems.push({
                Recipient: values[17],
                Prey_Item: values[18],
                Prey_Size: values[19],
            });

            currentFeeding.Plot_Status = values[21];
            currentFeeding.Comment = values[22];
        }

        currentFeeding.Number_of_Items = currentNumberOfItems;
        feedingData.push(currentFeeding);

        const stintData = dataLines[0].split(',');

        const jsonObject = {
            StintID: stintData[0],
            Stint_Type: stintData[1],
            Island: stintData[2],
            Species: stintData[3],
            Prey_Size_Method: stintData[4],
            Prey_Size_Reference: stintData[5],
            FirstName: stintData[6],
            LastName: stintData[7],
            Observer_Location: stintData[8],
            Date_Time_Start: stintData[9],
            Date_Time_End: stintData[10],
            Comment: stintData[11],
            feedingData: feedingData,
        };

        return jsonObject;
    }


    // const fs = require('fs');
// const path = require('path');
// export const handleSaveClick = (stint, stintID) => {
//     let data = stint;
//     data.StintID = stintID;

//     const jsonData = JSON.stringify(data, null, 2);

//     // Specify the filename
//     const fileName = 'backup.json';

//     if (typeof window.require === 'function') {
//         // Code for Electron environment
//         const { remote } = window.require('electron');
//         const filePath = path.join(__dirname, fileName);
//         const fs = remote.require('fs');
//         fs.writeFileSync(filePath, jsonData, 'utf-8');
//     } else {
//         // Code for the browser environment
//         const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
//         saveAs(blob, fileName);
//     }
// };



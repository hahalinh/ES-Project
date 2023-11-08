import { saveAs } from 'file-saver';

export const handleSaveClick = (stint, stintID) => {
    let csv = '';
    let data = stint;
    data.StintID = stintID;
    // const emptyFields = [];
    // const excludeKey = ["Comment"]; //this can be missing in data


    //Check for missing fields in stint data
    // Object.entries(data).forEach(([key, value]) => {
    //     if (value === "" && !excludeKey.includes(key)) {
    //         emptyFields.push(`Stint: ${key}`);
    //     }
    // })

    // // Check for missing fields in feeding data
    // data.feedingData.forEach((feeding, feedingIndex) => {
    //     Object.keys(feeding).forEach(key => {
    //         if (Array.isArray(feeding[key])) {
    //             feeding[key].forEach((item, itemIndex) => {
    //                 Object.keys(item).forEach(itemKey => {
    //                     if (item[itemKey] === '') {
    //                         emptyFields.push(`Feeding ${feedingIndex + 1}, Item ${itemIndex + 1}: ${itemKey}`);
    //                     }
    //                 });
    //             });
    //         } else {
    //             if (feeding[key] === '' && !excludeKey.includes(key)) {
    //                 emptyFields.push(`Feeding ${feedingIndex + 1}: ${key}`);
    //             }
    //         }
    //     });
    // });

    // if (emptyFields.length > 0) {
    //     alert(`Missing fields:\n${emptyFields.join('\n')}`);
    //     return;
    // }

    csv += jsonToCSV(data);

    const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    const dowloadName = stintID;

    saveAs(file, dowloadName);
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
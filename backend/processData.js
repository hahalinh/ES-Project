const fs = require('fs');

const convertToCSV = (objArray) => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

  return array.reduce((str, next) => {
    str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
    return str;
  }, str);
}

const readCSV = async (file) => {
  try {
    const data = await fs.promises.readFile(file, 'utf8');
    return data;
  } catch (err) {
    console.log(err);
    return "";
  }
}

const saveCSV = async (file, data) => {
  try {
    const csv = convertToCSV(data);
    await fs.promises.writeFile(file, csv);
    return 1;
  } catch (err) {
    throw err;
  }
}

const readJSON = async (file) => {
  try {
      const data = await fs.promises.readFile(file, 'utf8');
      return JSON.parse(data);
  } catch (err) {
      console.log(err);
      return [];
  }
}

const saveJSON = async (file, data) => {
  try {
      await fs.promises.writeFile(file, JSON.stringify(data));
      return 1;
  } catch (err) {
      throw err;
  }
}

module.exports = { saveCSV, readCSV, saveJSON, readJSON }; 
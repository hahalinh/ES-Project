const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const processData = require('./processData');

const fileCSV = 'data.csv';
const fileJSON = 'data.json';

app.post('/', async (req, res) => {
    const data = req.body;
    await processData.saveJSON(fileJSON, data);
    const allData = await processData.readJSON(fileJSON);
    await processData.saveCSV(fileCSV, allData);

    res.send({
        msg: "Successfully save!"
    });
})

app.get('/', async (req, res) => {
    const allData = await processData.readJSON(fileJSON);
    res.json(allData);
})


const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
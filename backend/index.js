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

const mongoose = require('mongoose');
const server = "mongodb+srv://nvduchuy04:ngoviduchuy123@esp.l9jrx9g.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(server,
    { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', err => console.log('Error connecting to DB', err))
mongoose.connection.once('open', () => console.log('Connected successfully!'))

const FeedingModel = mongoose.model('feeding', new mongoose.Schema({
    feedingID: String,
    nest: Number,
    timeArrive: String,
    timeDepart: String,
    provider: String,
    recipent: String,
    preyItem: String,
    preySize: Number,
    numberItems: Number
}))

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
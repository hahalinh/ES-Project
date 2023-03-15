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
const server = "mongodb+srv://nvduchuy04:ngoviduchuy123@esp.l9jrx9g.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(server,
    { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', err => console.log('Error connecting to DB', err))
mongoose.connection.once('open', () => console.log('Connected successfully!'))

const feedingSchema = new mongoose.Schema({
    feedingID: String,
    nest: String,
    timeArrive: String,
    timeDepart: String,
    provider: String,
    recipent: String,
    preyItem: String,
    preySize: String,
    numberItems: Number
})

const stintlSchema = new mongoose.Schema({
    StintlID: String,
    Stintl_Type: String,
    Island: String,
    Species: String,
    Prey_Size_Method: String,
    Prey_Size_Reference: String,
    FirstName: String,
    LastName: String,
    Observer_Location: String,
    Date_Time_Start: String,
    Date_Time_End: String,
    feedingData: {type: feedingSchema, default: () => ({})}
})

const StintlModel = new mongoose.model('stintl', stintlSchema);

app.post('/', async (req, res) => {
    //save to this computer
    const data = req.body;
    await processData.saveJSON(fileJSON, data);
    const allData = await processData.readJSON(fileJSON);
    await processData.saveCSV(fileCSV, allData);

    //save to database
    const stintl = new StintlModel({
        feedingData: data
    });
    await stintl.save();

    res.send(feeding);
})

app.get('/', async (req, res) => {
    const allData = await StintlModel.find();
    res.json(allData);
})


const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
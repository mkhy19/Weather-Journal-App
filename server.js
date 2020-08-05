// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
//Our local server code

//Set your port variables
//a server running on the port 8000
const port = 8000;
        
//Create the server
//Set your variable named server
const server = app.listen(port, listening);

//Callback function
function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// TODO-ROUTES!
// GET route
// pass a function in as the second parameter that returns the projectData object
app.get('/all', sendData);

function sendData (req, res) {
    res.send(projectData);
};

// POST route
// create a POST route that uses the url /addWeatherData and sends the response POST received when used to make a request.
app.post('/addWeatherData', addNewData)

function addNewData(req, res) {
    //res.send('POST received')

    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.user_res = req.body.user_res;

    res.end();
    console.log(projectData)
}
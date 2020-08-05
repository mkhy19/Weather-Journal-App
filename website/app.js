/* Global Variables */

//examples in USA:
//zip code: 55111 , City: Saint Paul - Minneapolis
//zip code: 99501 , City: Anchorage
//https://api.openweathermap.org/data/2.5/weather?zip=99501,us&APPID=206f2e76d1ea84859a30e0e95949e762
//https://samples.openweathermap.org/data/2.5/weather?zip=94040,us&appid=439d4b804bc8187953eb36d2a8c26a02

// Create global variables for Base URL and API Key for OpenWeatherMap API
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
//const apiKey = '&appid=ba960daefc10c56dc6f7608b7d568c3e&units=metric';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '206f2e76d1ea84859a30e0e95949e762';
const unitsMetric =  'metric';

// Create a new date instance dynamically with JS
let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', performAction);

// Inside that callback function call your async GET request with the parameters:
// 1 - base url
// 2 - user entered zip code (see input in html with id zip)
// 3 - personal API key
function performAction(e){
    // Access the value of DOM elements by selecting them in your JS code
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    console.log(newDate);
    
    getTemperature(baseURL, postCode, key)
    // Chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app
    .then(function (data){
        // Add data to POST request
        // The data object should include temperature, date, user response
        postData('http://localhost:8000/addWeatherData', {temperature: data.main.temp, date: newDate, user_res: feelings } )
        // Another Chain Promise to update the UI dynamically
        .then(function() {
            updateUI()
        })
    })
}

// Async GET
// An async function in that uses fetch() to make a GET request to the OpenWeatherMap API.
const getTemperature = async (baseURL, code, key)=>{
    // const getTemperatureDemo = async (url)=>{
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + key + '&units='+ unitsMetric)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);

        console.log('Saint Paul - Minneapolis');

        return data;
    }
    catch(error) {
        console.log('error', error);
        // appropriately handle the error
    }
}

// Async POST
// Async function to make POST request
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        console.log('Saint Paul - Minneapolis 2');
        const newData = await postRequest.json();
        console.log(newData, 'Saint Paul - Minneapolis 3');

        return newData;
    }
    catch (error) {
        console.log('Error', error);
        // appropriately handle the error
    }
}

// Update user interface UI dynamically
// This function should retrieve data from our app, select the necessary elements on the DOM (index.html), and then update their necessary values to reflect the dynamic values for: Temperature, Date, User input
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try {
        const allData = await request.json();
        console.log('Update user interface UI dynamically');

        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_res;
    }
    catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
}
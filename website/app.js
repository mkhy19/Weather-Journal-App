/* Global Variables */

// Create global variables for Base URL and API Key for OpenWeatherMap API
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = '206f2e76d1ea84859a30e0e95949e762';

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
    const postCode = document.getElementById('zip').value;
    console.log(newDate);
    
    getTemperature(baseURL, postCode, key)
}

// Async GET
// An async function in that uses fetch() to make a GET request to the OpenWeatherMap API.
const getTemperature = async (baseURL, code, key)=>{
    // const getTemperatureDemo = async (url)=>{
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + key)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);

        console.log('Cairo');

        return data;
    }
    catch(error) {
        console.log('error', error);
        // appropriately handle the error
    }
}
import { key } from './key.js';
const weatherInfoCo = document.getElementById("weather-info-co")
const lat = "50.99317423134494"; 
const lon = "3.875852782814391";
const weatherApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`;

/*fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    
    .then(err => console.log(err));*/


// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    
    show(data);
}

// Calling that async function
getapi(weatherApiUrl);
  
const show = (data) =>{
    console.log(data.list[0].components.co);
} 


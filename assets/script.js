import { key } from './key.js';
const lat = "50.99317423134494"; 
const lon = "3.875852782814391";
const weatherApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`;
fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .then(err => console.log(err));

import { Weather_API_key, PositionStack_API_Key } from './config.js';
const weatherInfo = document.getElementById("weather-info");
const coValue = document.getElementById("co-value");
const noValue = document.getElementById("no-value");
const noQuality = document.getElementById("no-quality");
const no2Value = document.getElementById("no2-value");
const no2Quality = document.getElementById("no2-quality");
const o3Value = document.getElementById("o3-value");
const o3Quality = document.getElementById("o3-quality");
const so2Value = document.getElementById("so2-value");
const so2Quality = document.getElementById("so2-quality");
const pm25Value = document.getElementById("pm25-value");
const pm25Quality = document.getElementById("pm25-quality");
const pm10Value = document.getElementById("pm10-value");
const pm10Quality = document.getElementById("pm10-quality");
const nh3Value = document.getElementById("nh3-value");
const nh3Quality = document.getElementById("nh3-quality");
const submitButton = document.getElementById("submit-button");
let outputAdress = "";
let outputAqi = "";
let cityInput = document.getElementById("input-city");

//TODO
// 1) air quality colors
// add weather API
// add unsplash API
// remeber users choice on subsequent visits
// compare weather



/*fetch(positionStackApiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .then(err => console.log(err));*/

const getLocationCoordinates = () => {
    let adress = cityInput.value;
    console.log(adress);

    //get position API
    const positionStackApiUrl = `http://api.positionstack.com/v1/forward?access_key=${PositionStack_API_Key}&query=${adress}`;
    getPositionApi(positionStackApiUrl);
    
}

    // Defining async function
async function getPositionApi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    let data = await response.json();
    console.log(data);
    console.log("lon: " + data.data[0].longitude);
    let lat = data.data[0].latitude;
    let lon = data.data[0].longitude;

    outputAdress = data.data[0].label;
    console.log("adres = " + outputAdress);

    // call weather API
    const weatherApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${Weather_API_key}`;
    getWeatherApi(weatherApiUrl);
}

// Defining async function
async function getWeatherApi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);

    //setting all data
    outputAqi = data.list[0].main.aqi;
    console.log("aqi= " + outputAqi);
    setData(data);
}

  
const setData = (data) =>{

    //set tekst
    weatherInfo.innerHTML = `The air quality in ${outputAdress} is  ${outputAqi}. `;

    //set values
    coValue.innerText = data.list[0].components.co;
    noValue.innerText = data.list[0].components.no;
    no2Value.innerText = data.list[0].components.no2;
    o3Value.innerText = data.list[0].components.o3;
    so2Value.innerText = data.list[0].components.so2;
    pm25Value.innerText = data.list[0].components.pm2_5;
    pm10Value.innerText = data.list[0].components.pm10;
    nh3Value.innerText = data.list[0].components.nh3;

    //put data in variables
    const coData = data.list[0].components.co;
    const noData = data.list[0].components.no;
    const no2Data = data.list[0].components.no2;
    const o3Data = data.list[0].components.o3;
    const so2Data = data.list[0].components.so2;
    const pm25Data = data.list[0].components.pm2_5;
    const pm10Data = data.list[0].components.pm10;
    const nh3Data = data.list[0].components.nh3;
    //check values and set quality
    //no2
    if (no2Data <= 25){
        no2Quality.innerText = "Excellent";
    }
    else if (no2Data >= 25 && no2Data <= 50){
        no2Quality.innerText = "Fine";
    }
    else if (no2Data >= 50 && no2Data <= 100){
        no2Quality.innerText = "Moderate";
    }
    else if (no2Data >= 100 && no2Data <= 200){
        no2Quality.innerText = "Poor";
    }
    else if (no2Data >= 200 && no2Data <= 400){
        no2Quality.innerText = "Very poor";
    }
    else{
        no2Quality.innerText = "Severe";
    }
    //O3
    if (o3Data <= 33){
        o3Quality.innerText = "Excellent";
    }
    else if (o3Data >= 33 && o3Data <= 65){
        o3Quality.innerText = "Fine";
    }
    else if (o3Data >= 65 && o3Data <= 120){
        o3Quality.innerText = "Moderate";
    }
    else if (o3Data >= 120 && o3Data <= 180){
        o3Quality.innerText = "Poor";
    }
    else if (o3Data >= 180 && o3Data <= 240){
        o3Quality.innerText = "Very poor";
    }
    else {
        o3Quality.innerText = "Severe";
    }
    //SO2
    if (so2Data <= 25){
        so2Quality.innerText = "Excellent";
    }
    else if (so2Data >= 25 && so2Data <= 50){
        so2Quality.innerText = "Fine";
    }
    else if (so2Data >= 50 && so2Data <= 120){
        so2Quality.innerText = "Moderate";
    }
    else if (so2Data >= 120 && so2Data <= 350){
        so2Quality.innerText = "Poor";
    }
    else if (so2Data >= 350 && so2Data <= 500){
        so2Quality.innerText = "Very poor";
    }
    else {
        so2Quality.innerText = "Severe";
    }
    //PM2.5
    if ( pm25Data <= 7){
        pm25Quality.innerText = "Excellent";
    }
    else if (pm25Data >= 7 && pm25Data <= 15){
        pm25Quality.innerText = "Fine";
    }
    else if (pm25Data >= 15 && pm25Data <= 30){
        pm25Quality.innerText = "Moderate";
    }
    else if (pm25Data >= 30 && pm25Data <= 55){
        pm25Quality.innerText = "Poor";
    }
    else if (pm25Data >= 55 && pm25Data <= 110){
        pm25Quality.innerText = "Very poor";
    }
    else {
        pm25Quality.innerText = "Severe";
    }
    //PM10
    if ( pm10Data <= 12){
        pm10Quality.innerText = "Excellent";
    }
    else if (pm10Data >= 12 && pm10Data <= 25){
        pm10Quality.innerText = "Fine";
    }
    else if (pm10Data >= 25 && pm10Data <= 50){
        pm10Quality.innerText = "Moderate";
    }
    else if (pm10Data >= 50 && pm10Data <= 90){
        pm10Quality.innerText = "Poor";
    }
    else if (pm10Data >= 90 && pm10Data <= 180){
        pm10Quality.innerText = "Very poor";
    }
    else {
        pm10Quality.innerText = "Severe";
    }
    //NH3
    if ( nh3Data <= 3){
        nh3Quality.innerText = "Excellent";
    }
    else if (nh3Data >= 3 && nh3Data <= 7.5){
        nh3Quality.innerText = "Fine";
    }
    else if (nh3Data >= 7.5 && nh3Data <= 37.5){
        nh3Quality.innerText = "Moderate";
    }
    else if (nh3Data >= 37.5 && nh3Data <= 15000){
        nh3Quality.innerText = "Poor";
    }
    else if (nh3Data >= 15000 && nh3Data <= 150000){
        nh3Quality.innerText = "Very poor";
    }
    else {
        nh3Quality.innerText = "Severe";
    }
} 

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        getLocationCoordinates();
    }
});
submitButton.addEventListener("click", getLocationCoordinates);
import { Weather_API_key, PositionStack_API_Key } from './config.js';


const weatherCard = document.querySelector(".weatherCard");
const main = document.querySelector("main");
main.style.visibility = "hidden";
const airInfo = document.getElementById("air-info");
const coValue = document.getElementById("co-value");
const coQuality = document.getElementById("co-quality");
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
let currentWeatherIcon;
let cityInput = document.getElementById("input-city");
let foreCastIconSrc = "#";
let foreCastIconAlt = "#";
let cityName = "";



//TODO
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

    //set main to visible
    main.style.visibility = "visible";    
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

    //cityName.innerText = data.data[0].locality;
    cityName = data.data[0].locality;
    console.log("gemeente= " + cityName);

    // call weather API
    const oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely}&units=metric&appid=${Weather_API_key}`;
    getOneCallApi(oneCallApiUrl);
    const weatherApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${Weather_API_key}`;
    getWeatherApi(weatherApiUrl);
}

async function getOneCallApi(url) {
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);

    
    setWeatherData(data);
    createWeather(data, foreCastIconSrc, foreCastIconAlt, cityName);
    console.log("WeatherData= " + foreCastIconSrc);
    
}

const setWeatherData = (data) => {
    currentWeatherIcon = data.current.weather[0].main;
    switch (currentWeatherIcon) {
        case "Clouds":
            foreCastIconSrc = "assets/Clouds.png";
            foreCastIconAlt = "Icon of clouds";
            break;
        case "Clear":
            foreCastIconSrc = "assets/Sun.png";
            foreCastIconAlt = "Icon of the sun";
            break;
        case "Snow":
            foreCastIconSrc = "assets/Snow.png";
            foreCastIconAlt = "Icon of snow clouds";
            break;
        case "Rain":
            foreCastIconSrc = "assets/Rain.png";
            foreCastIconAlt = "Icon of rain clouds";
            break;
        case "Drizzle":
            foreCastIconSrc = "assets/Rain.png";
            foreCastIconAlt = "Icon of rain clouds";
            break;
        case "Thunderstorm":
            foreCastIconSrc = "assets/Thunder.png";
            foreCastIconAlt = "Icon of thunder clouds";
            break;
    
        default:
            break;
    }
}

const createWeather = (data, iconSrc, iconAlt, cityName) =>{
    let code = `
        <h1 id="city-name">${cityName}</h1>
        <img src="${iconSrc}" alt="${iconAlt}" id="forecast-icon">
        <p id="forecast-degrees">${data.current.temp} &#8451;</p>
        <p id="forecast-description">${data.current.weather[0].description}</p>
        <div class="feelsLike">
            <img src="${iconSrc}" alt="${iconAlt}" class="smallIcon">
            <p id="feels-like-text">Feels Like</p>
            <p id="feels-like-degrees">${data.current.feels_like} &#8451;</p>
        </div>
        <div class="humidity">
            <img src="assets/Humidity.png" alt="Humidity icon" class="smallIcon"">
            <p id="humidity-text">Humidity</p>
            <p id="humidity-percent">${data.current.humidity} &#37;</p>
        </div>
        <div class="wind">
            <img src="assets/Wind.png" alt="Wind icon" class="smallIcon"">
            <p id="wind-text">Wind</p>
            <p id="wind-speed">${data.current.wind_speed} km&#47;h</p>
        </div>
        <div class="uvIndex">
            <img src="assets/Sun.png" alt="Sun icon" class="smallIcon"">
            <p id="uv-text">UV&#45;Index</p>
            <p id="uv-index">${data.current.uvi}</p>
        </div>
        `;
        weatherCard.innerHTML = code;
        console.log("weathercard runt");
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
    switch (outputAqi) {
        case 1:
            airInfo.innerHTML = `The air quality in ${outputAdress} is  <span class="excellent">good</span>. `;
            break;
        case 2:
            airInfo.innerHTML = `The air quality in ${outputAdress} is  <span class="fine">fair</span>. `;
            break;
        case 3:
            airInfo.innerHTML = `The air quality in ${outputAdress} is  <span class="moderate">moderate</span>. `;
            break;
        case 4:
            airInfo.innerHTML = `The air quality in ${outputAdress} is  <span class="poor">poor</span>. `;
            break;
        default:
            airInfo.innerHTML = `The air quality in ${outputAdress} is  <span class="Severe">very poor</span>. `;
            break;
    }
   

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
    //co
    if (coData <= 1000){
        coQuality.innerText = "Excellent";
        coQuality.classList.add("excellent");
    }
    else if (coData >= 1000 && coData <= 2000){
        coQuality.innerText = "Fine";
        coQuality.classList.add("fine");
    }
    else if (coData >= 2000 && coData <= 4000){
        coQuality.innerText = "Moderate";
        coQuality.classList.add("moderate");
    }
    else if (coData >= 4000 && coData <= 10000){
        coQuality.innerText = "Poor";
        coQuality.classList.add("poor");
    }
    else if (coData >= 10000 && coData <= 30000){
        coQuality.innerText = "Very poor";
        coQuality.classList.add("veryPoor");
    }
    else {
        coQuality.innerText = "Severe";
        coQuality.classList.add("severe");
    }
    //no2
    if (no2Data <= 25){
        no2Quality.innerText = "Excellent";
        no2Quality.classList.add("excellent");
    }
    else if (no2Data >= 25 && no2Data <= 50){
        no2Quality.innerText = "Fine";
        no2Quality.classList.add("fine");
    }
    else if (no2Data >= 50 && no2Data <= 100){
        no2Quality.innerText = "Moderate";
        no2Quality.classList.add("moderate");
    }
    else if (no2Data >= 100 && no2Data <= 200){
        no2Quality.innerText = "Poor";
        no2Quality.classList.add("poor");
    }
    else if (no2Data >= 200 && no2Data <= 400){
        no2Quality.innerText = "Very poor";
        no2Quality.classList.add("veryPoor");
    }
    else{
        no2Quality.innerText = "Severe";
        no2Quality.classList.add("severe");
    }
    //O3
    if (o3Data <= 33){
        o3Quality.innerText = "Excellent";
        o3Quality.classList.add("excellent");
    }
    else if (o3Data >= 33 && o3Data <= 65){
        o3Quality.innerText = "Fine";
        o3Quality.classList.add("fine");
    }
    else if (o3Data >= 65 && o3Data <= 120){
        o3Quality.innerText = "Moderate";
        o3Quality.classList.add("moderate");
    }
    else if (o3Data >= 120 && o3Data <= 180){
        o3Quality.innerText = "Poor";
        o3Quality.classList.add("poor");
    }
    else if (o3Data >= 180 && o3Data <= 240){
        o3Quality.innerText = "Very poor";
        o3Quality.classList.add("veryPoor");
    }
    else {
        o3Quality.innerText = "Severe";
        o3Quality.classList.add("severe");
    }
    //SO2
    if (so2Data <= 25){
        so2Quality.innerText = "Excellent";
        so2Quality.classList.add("excellent");
    }
    else if (so2Data >= 25 && so2Data <= 50){
        so2Quality.innerText = "Fine";
        so2Quality.classList.add("fine");
    }
    else if (so2Data >= 50 && so2Data <= 120){
        so2Quality.innerText = "Moderate";
        so2Quality.classList.add("moderate");
    }
    else if (so2Data >= 120 && so2Data <= 350){
        so2Quality.innerText = "Poor";
        so2Quality.classList.add("poor");
    }
    else if (so2Data >= 350 && so2Data <= 500){
        so2Quality.innerText = "Very poor";
        so2Quality.classList.add("veryPoor");
    }
    else {
        so2Quality.innerText = "Severe";
        so2Quality.classList.add("severe");
    }
    //PM2.5
    if ( pm25Data <= 7){
        pm25Quality.innerText = "Excellent";
        pm25Quality.classList.add("excellent");
    }
    else if (pm25Data >= 7 && pm25Data <= 15){
        pm25Quality.innerText = "Fine";
        pm25Quality.classList.add("fine");
    }
    else if (pm25Data >= 15 && pm25Data <= 30){
        pm25Quality.innerText = "Moderate";
        pm25Quality.classList.add("moderate");
    }
    else if (pm25Data >= 30 && pm25Data <= 55){
        pm25Quality.innerText = "Poor";
        pm25Quality.classList.add("poor");
    }
    else if (pm25Data >= 55 && pm25Data <= 110){
        pm25Quality.innerText = "Very poor";
        pm25Quality.classList.add("veryPoor");
    }
    else {
        pm25Quality.innerText = "Severe";
        pm25Quality.classList.add("severe");
    }
    //PM10
    if ( pm10Data <= 12){
        pm10Quality.innerText = "Excellent";
        pm10Quality.classList.add("excellent");
    }
    else if (pm10Data >= 12 && pm10Data <= 25){
        pm10Quality.innerText = "Fine";
        pm10Quality.classList.add("fine");
    }
    else if (pm10Data >= 25 && pm10Data <= 50){
        pm10Quality.innerText = "Moderate";
        pm10Quality.classList.add("moderate");
    }
    else if (pm10Data >= 50 && pm10Data <= 90){
        pm10Quality.innerText = "Poor";
        pm10Quality.classList.add("poor");
    }
    else if (pm10Data >= 90 && pm10Data <= 180){
        pm10Quality.innerText = "Very poor";
        pm10Quality.classList.add("veryPoor");
    }
    else {
        pm10Quality.innerText = "Severe";
        pm10Quality.classList.add("severe");
    }
    //NH3
    if ( nh3Data <= 3){
        nh3Quality.innerText = "Excellent";
        nh3Quality.classList.add("excellent");
    }
    else if (nh3Data >= 3 && nh3Data <= 7.5){
        nh3Quality.innerText = "Fine";
        nh3Quality.classList.add("fine");
    }
    else if (nh3Data >= 7.5 && nh3Data <= 37.5){
        nh3Quality.innerText = "Moderate";
        nh3Quality.classList.add("moderate");
    }
    else if (nh3Data >= 37.5 && nh3Data <= 15000){
        nh3Quality.innerText = "Poor";
        nh3Quality.classList.add("poor");
    }
    else if (nh3Data >= 15000 && nh3Data <= 150000){
        nh3Quality.innerText = "Very poor";
        nh3Quality.classList.add("veryPoor");
    }
    else {
        nh3Quality.innerText = "Severe";
        nh3Quality.classList.add("severe");
    }
} 

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        getLocationCoordinates();
    }
});
submitButton.addEventListener("click", getLocationCoordinates);
import { Weather_API_key, PositionStack_API_Key } from './config.js';
const weatherInfo = document.getElementById("weather-info");
const coValue = document.getElementById("co-value");
const noValue = document.getElementById("no-value");
const no2Value = document.getElementById("no2-value");
const o3Value = document.getElementById("o3-value");
const so2Value = document.getElementById("so2-value");
const pm25Value = document.getElementById("pm25-value");
const pm10Value = document.getElementById("pm10-value");
const nh3Value = document.getElementById("nh3-value");
const submitButton = document.getElementById("submit-button");
let outputAdress = "";
let outputAqi = "";
let cityInput = document.getElementById("input-city");





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

    //check values and set quality
} 

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        getLocationCoordinates();
    }
});
submitButton.addEventListener("click", getLocationCoordinates);
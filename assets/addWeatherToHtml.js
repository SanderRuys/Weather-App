const addWeatherToHtml = (data, iconSrc, iconAlt, cityName) =>{
    const weatherCard = document.querySelector(".weatherCard");
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

export {
    addWeatherToHtml
}

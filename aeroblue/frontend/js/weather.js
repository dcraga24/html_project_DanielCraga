// =====================================
// AeroBlue Weather API (Open-Meteo)
// No API Key Required
// =====================================

async function getWeather() {

    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    const city = cityInput.value.trim();

    if (city === "") {

        weatherResult.innerHTML = `
            <div class="weather-error">
                Please enter a city name.
            </div>
        `;

        return;
    }

    weatherResult.innerHTML = `
        <div class="weather-loading">
            Loading weather information...
        </div>
    `;

    try {

        // STEP 1: Convert city name into coordinates

        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // STEP 2: Get weather using coordinates

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,pressure_msl`
        );

        const weatherData = await weatherResponse.json();

        const weather = weatherData.current;

        weatherResult.innerHTML = `
            <div class="weather-result-card">

                <div class="weather-info">

                    <div class="weather-city">
                        ${location.name}
                    </div>

                    <div class="weather-temp">
                        ${Math.round(weather.temperature_2m)}°C
                    </div>

                    <div class="weather-description">
                        Current Weather
                    </div>

                    <div class="weather-details">

                        <div class="weather-detail">
                            <strong>Feels Like</strong>
                            <span>${Math.round(weather.apparent_temperature)}°C</span>
                        </div>

                        <div class="weather-detail">
                            <strong>Humidity</strong>
                            <span>${weather.relative_humidity_2m}%</span>
                        </div>

                        <div class="weather-detail">
                            <strong>Wind</strong>
                            <span>${weather.wind_speed_10m} km/h</span>
                        </div>

                        <div class="weather-detail">
                            <strong>Pressure</strong>
                            <span>${weather.pressure_msl} hPa</span>
                        </div>

                    </div>

                </div>

                <div class="weather-icon">

                    <i class="fa-solid fa-cloud-sun"></i>

                </div>

            </div>
        `;

    }
    catch (error) {

        weatherResult.innerHTML = `
            <div class="weather-error">
                ${error.message}
            </div>
        `;

        console.error(error);
    }
}

// Enter key support

document.addEventListener("DOMContentLoaded", () => {

    const cityInput = document.getElementById("cityInput");

    if (cityInput) {

        cityInput.addEventListener("keypress", function(event) {

            if (event.key === "Enter") {
                getWeather();
            }

        });

    }

});
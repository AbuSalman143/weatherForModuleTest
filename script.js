// JavaScript code (script.js)
// OpenWeatherMap API URL
const apiKey = 'fa1dbfe7f3b0c43bea92738bb6fba581';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';



// Data storage for cities
let citiesData = [];

// Function to add a new city
function addCity(cityName) {
    // Check if the city has not been added before
    if (!citiesData.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
        // Fetch weather data for the city
        const url = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
        $.getJSON(url, function (data) {
            // Extract relevant weather information
            const cityWeatherData = {
                name: data.name,
                icon: data.weather[0].icon,
                temp: {
                    current: data.main.temp,
                    high: data.main.temp_max,
                    low: data.main.temp_min,
                },
                condition: data.weather[0].main,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                wind: data.wind.speed,
            };

            // Add the city data to the array
            citiesData.push(cityWeatherData);

            // Sort the cities by temperature (lowest to highest)
            citiesData.sort((a, b) => a.temp.current - b.temp.current);

            // Update the weather cards display
            updateWeatherCards();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(`Error: ${textStatus} - ${errorThrown}`);
        });
    }
}

// Function to update the weather cards display
function updateWeatherCards() {
    const weatherCardsContainer = $('#weatherCards');
    weatherCardsContainer.empty();

    citiesData.forEach(city => {
        const card = `
            <div class="weather-card">
                <img src="https://openweathermap.org/img/w/${city.icon}.png" alt="${city.condition}">
                <p>${city.name}</p>
                <h1>${city.temp.current}°C</h1>
                <p>H: ${city.temp.high}°C</p> <p>L: ${city.temp.low}°C</p>
                <p>Wind Speed: ${city.wind} m/s</p>
            </div>
        `;
        weatherCardsContainer.append(card);
    });
}

// Function to handle the "Add" button click
$('#addCityBtn').click(function () {
    const cityName = $('#cityInput').val().trim();
    if (cityName !== '') {
        addCity(cityName);
        $('#cityInput').val('');
    }
});

// Function to handle pressing Enter key on the input field
$('#cityInput').on('keydown', function (event) {
    if (event.key === 'Enter') {
        $('#addCityBtn').click();
    }
});

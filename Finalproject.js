const username = 'faridehtaheri'; 
const apiKey = 'api key'; 

document.addEventListener('DOMContentLoaded', () => {
    const cityDropdown = document.getElementById('city-dropdown');
    const travelForm = document.getElementById('travel-form');
    const weatherInfo = document.getElementById('weather-info');

    //city dropdown
    fetchCities();

    travelForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const cityName = cityDropdown.value;
        const travelDate = document.getElementById('start-date').value;

        if (!cityName || !travelDate) {
            weatherInfo.textContent = 'Please select a city and a travel date.';
            return;
        }
        
        getWeather(cityName, travelDate);
    });

    
    function fetchCities() {
        fetch(`http://api.geonames.org/searchJSON?featureClass=P&maxRows=100&username=${username}`)
            .then(response => response.json())
            .then(data => {
                cityDropdown.innerHTML = '';

                if (data.geonames && data.geonames.length > 0) {
                    data.geonames.forEach(city => {
                        const option = document.createElement('option');
                        option.value = city.name;
                        option.textContent = `${city.name}, ${city.countryName}`;
                        cityDropdown.appendChild(option);
                    });
                } else {
                    cityDropdown.innerHTML = '<option value="">No cities found</option>';
                }
            })
            .catch(error => {
                console.error('Error fetching city data:', error);
                cityDropdown.innerHTML = '<option value="">Error loading cities</option>';
            });
    }

    //fetch weather data
    function getWeather(cityName, travelDate) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                
                const forecast = data.list.find(item => item.dt_txt.startsWith(travelDate)); 

                if (forecast) {
                    displayWeather(data.city.name, forecast, travelDate);
                } else {
                    weatherInfo.textContent = 'No weather data available for the selected date.';
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.textContent = 'Error fetching weather data.';
            });
    }

    function displayWeather(cityName, forecast, travelDate) {
        const weatherDetails = `
            <h3>Weather for ${cityName} on ${travelDate}</h3>
            <p>Temperature: ${forecast.main.temp}°C</p>
            <p>Weather: ${forecast.weather[0].description}</p>
            <p>Wind Speed: ${forecast.wind.speed} m/s</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
        `;
        weatherInfo.innerHTML = weatherDetails;
    }
});

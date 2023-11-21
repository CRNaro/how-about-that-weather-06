//  Acceptance Criteria:
//AS A traveler
//I WANT to see the weather outlook for multiple cities
//SO THAT I can plan a trip accordingly
//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city

// My API key
const apiKey = '8e7d624a36ee6dc86609752312393f54';
//City search input
const city = '';

// Declarations for the HTML elements
const citySearchEl = $('#search-input');
const citySearchBtn = $('#search-btn');
const clearHistoryBtn = $('#clear-history');
const cityHistoryEl = $('#history-list');
const currentCityEl = $('#city-name'); // changed from city-weather
const currentTempEl = $('#temperature');
const currentHumidityEl = $('#humidity');
const currentWindEl = $('#wind-speed');
const currentUVEl = $('#UV-index');

// Searches for the city entered in the search bar
const searchCity = [];

function find (city) {
    for (var i = 0; i < searchCity.length; i++) {
        if (city.toUpperCase() === searchCity[i]) {
            return -1;
        }
    }
    return 1;
}

function getCity (city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    return fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.length > 0) {
            return{
                latitude: data[0].lat, 
                longitude: data[0].lon,
            };
        } else {
            return error('City not found');
        }
        });
    }


// Function to display current weather
function displayWeather(event) {
    event.preventDefault();
    if (citySearchEl.val().trim() !== '') {
       let city = citySearchEl.val().trim();
       getCity(city)
       .then((coordinates) => {
        currentWeather(city, coordinates);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    }else{
        alert('Please enter a city name');
    }
}

function currentWeather(city, coordinates) {
    //const quereyURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey; 
    const quereyURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}`;
    fetch(quereyURL)
    .then(function(response){
        return response.json();
    }).then((data) =>{
        const weatherIcon = data.weather[0].icon; //data or response .weather?
        const cityName = data.name;
        const temperature = data.main.temp - 273.15; //convert to Celsius - will need to fix to F
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        console.log(data);

        currentCityEl.text(cityName); //+ ' (' + new Date().toLocaleDateString()) + ')';
        currentTempEl.text('Temperature: ' + temperature + '°C');
        currentHumidityEl.text('Humidity: ' + humidity + '%');
        currentWindEl.text('Wind Speed: ' + windSpeed + 'MPH');

        let img = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + weatherIcon + '.png');
        currentCityEl.append(img);
       
        //document.getElementById('weather-icon').innerHTML = '<img src="http://openweathermap.org/img/w/' + weatherIcon + '.png';
        //currentCityEl.text(cityName + ' (' + new Date().toLocaleDateString()) + ')';
        //currentTempEl.text('Temperature: ' + temperature);
        //currentHumidityEl.text('Humidity: ' + humidity);
       //currentWindEl.text('Wind Speed: ' + windSpeed);
    })
    // Error handler for fetch if city is not found
    .catch((error) => {
        console.log('Error:', error);
    });
};


// Function to display UV index


// Function to display 5 day forecast


// Save searched cities to local storage and dynamically create buttons for each city


// Clear search history from page


// Event listeners and click events
$(document).ready(function() {
citySearchBtn.click(displayWeather);
});
//citySearchBtn.on('click', displayWeather);

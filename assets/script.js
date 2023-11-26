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
//weatherData

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
// Save city to ul 
function saveCity(city) {
    
    const li = $('<li>').addClass('list-group-item list-group-action').text(city);
        li.css({
            'cursor': 'pointer',
            'width': '100%',
            'margin': '5px',
            'height': '50px',
           
        
        });
    li.on('click', function(event) {
        event.preventDefault();
        const allData = JSON.parse(localStorage.getItem(city)) || []; 
        const cityData = allData[allData.length - 1];

        if (cityData && cityData.latitude && cityData.longitude) {
            currentWeather(cityData); 
            fiveDayForecast(city);
        }
    });  
    $('#history-list').append(li);
}
    



// Function to display current weather
function displayWeather(data) {  
    event.preventDefault();
    if (citySearchEl.val().trim() !== '') {
       let city = citySearchEl.val().trim();
       getCity(city)
       .then((coordinates) => {
        currentWeather(city, coordinates);
        fiveDayForecast(city); 
        saveCity(city);
        citySearchEl.val('');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    }else{
        alert('Please enter a city name');
    }
}

function currentWeather(city, coordinates) { 
    const quereyURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}`;
    fetch(quereyURL)
    .then(function(response){
        return response.json();
    }).then((data) =>{
        const allData = JSON.parse(localStorage.getItem(city)) || []; 
        
        // Add new data to array    
        allData.push(data);
        // Save to local storage
        localStorage.setItem(city, JSON.stringify(allData));




        const weatherIcon = data.weather[0].icon; 
        const cityName = data.name;
        const temperature = data.main.temp *9/5 - 459.67;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

       

        currentCityEl.text(cityName); 
        currentTempEl.text('Temperature: ' + temperature.toFixed(2) + '°F');
        currentHumidityEl.text('Humidity: ' + humidity + '%');
        currentWindEl.text('Wind Speed: ' + windSpeed + 'MPH');

        let img = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + weatherIcon + '.png');
        currentCityEl.append(img);
       
      

        fiveDayForecast(city);
    })
    // Error handler for fetch if city is not found
    .catch((error) => {
        console.log('Error:', error);
    });
};



// Function to display 5 day forecast
function fiveDayForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const forecasts = data.list;
        let currentDate = new Date().getDate();
        let dayCount = 1;
        // Loop through all forecasts
        forecasts.forEach((forecast, i) => {
            const date = new Date(forecast.dt * 1000);   
          if (date.getDate() !== currentDate) {    
            currentDate = date.getDate();
            console.log("Updating forecast for day " + dayCount);
            $('#date-' + dayCount).text(date.toDateString()); 
           $('#weather-icon-' + dayCount).attr('src', 'http://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png');
           $('#temperature-' + dayCount).text('Temp: ' + ((forecast.main.temp - 273.15) * 9/5 + 32).toFixed(2) + '°F'); 
           $('#humidity-' + dayCount).text('Humidity: ' + forecast.main.humidity + '%');
            dayCount++;
            if (dayCount > 5) {
                return;
            }
          }
        });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
       }




// Event listeners and click events
$(document).ready(function() {
citySearchBtn.click(displayWeather);
});
$('#history-list').on('click', 'li', function(event){
    const city = $(this).text();
    getCity(city)
    .then((coordinates) => {
        currentWeather(city, coordinates);
        fiveDayForecast(city);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}); 

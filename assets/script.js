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
const = citySearchEl = $('#search-input');
const = citySearchBtn = $('#search-btn');
const = clearHistoryBtn = $('#clear-history');
const = cityHistoryEl = $('#history-list');
const = currentCityEl = $('#city-weather');
const = currentTempEl = $('#temperature');
const = currentHumidityEl = $('#humidity');
const = currentWindEl = $('#wind-speed');
const = currentUVEl = $('#UV-index');

// Searches for the city entered in the search bar
const = searchCity [];



// Function to display current weather


// Function to display UV index


// Function to display 5 day forecast


// Save searched cities to local storage and dynamically create buttons for each city


// Clear search history from page


// Event listeners and click events



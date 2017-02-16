
(function() {
  var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
  var DARKSKY_API_KEY = 'ddf0dc512ea34f4346b069ba249bec49';
  var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  var GOOGLE_MAPS_API_KEY = 'AIzaSyAw3WO6vU-jfeZ-n6XqUEAPVY18zFaY7e8';
  var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

  function getCurrentWeather(coords) {
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}`;

    return (
      fetch(url)
      .then(response => response.json())
      .then(data => data.currently)
    )
  }

  function getCoordinatesForCity(cityName) {
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

    return (
      fetch(url)
      .then(response => response.json())
      .then(data => data.results[0].geometry.location)
    )
  }

  var app = document.querySelector('#app');
  var cityForm = app.querySelector('.city-form');
  var cityInput = cityForm.querySelector('.city-input');
  var getWeatherButton = cityForm.querySelector('.get-weather-button');
  var cityWeather = app.querySelector('.city-weather');

  cityForm.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from submitting

    var city = cityInput.value;

    getCoordinatesForCity(city)
    .then(getCurrentWeather)
    .then(function(weather) {
		cityWeather.innerText = 'Loading...';
    setTimeout(function(){
      cityWeather.innerText = 
      'Your city: ' + city + '\n' +
      'Current temperature: ' + weather.temperature + ' °C'
      + '\n' + 'Current Precipitation Probablity: '+ weather.precipProbability
      + '\n' + 'Feels like: '+ weather.apparentTemperature + ' °C'
      + '\n' + 'Weather condition: '+ weather.icon
      + '\n' + 'Current time: '+ new Date(weather.time*1000);
    },1000);
    })
  });
})();

// Basic fetch functionality
// Change variable names (json, testDiv)
// Change fetch type
// const testDiv = document.createElement('div');
// document.body.appendChild(testDiv);

// DOM Variables
// Autocomplete
const locations = [];

// Current
const currentCity = document.querySelector('#currentCity');
const currentTemp = document.querySelector('#currentTemp');
const currentDesc = document.querySelector('#currentDesc');
const currentHigh = document.querySelector('#currentHigh');
const currentLow = document.querySelector('#currentLow');

// Forecast Hour
const forecastHour = document.querySelector('#forecastHour');

// Forecast Day
const day1Day = document.querySelector('#dayOne>.day');
const day1Icon = document.querySelector('#dayOne>.icon');
const day1HighC = document.querySelector('#dayOne>.highC');
const day1LowC = document.querySelector('#dayOne>.lowC');

const day2Day = document.querySelector('#dayTwo>.day');
const day2Icon = document.querySelector('#dayTwo>.icon');
const day2HighC = document.querySelector('#dayTwo>.highC');
const day2LowC = document.querySelector('#dayTwo>.lowC');

const day3Day = document.querySelector('#dayThree>.day');
const day3Icon = document.querySelector('#dayThree>.icon');
const day3HighC = document.querySelector('#dayThree>.highC');
const day3LowC = document.querySelector('#dayThree>.lowC');

// Wind
const windSpeed = document.querySelector('#windSpeed');
const windDir = document.querySelector('#windDir');
const windDeg = document.querySelector('#windDeg');

// Feels Like
const feelsLike = document.querySelector('#feelsLikeC');

// Sun
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

// Moon
const illumination = document.querySelector('#illumination');
const moonrise = document.querySelector('#moonrise');
const moonPhase = document.querySelector('#moonPhase');

// Visibility
const visibility = document.querySelector('#visKm');

// Precipitation
const precipitation = document.querySelector('#precipMm');

// Humidity
const humidity = document.querySelector('#humidPercent');

// Pressure
const pressure = document.querySelector('#pressHpa');

// Functions
// Reset forecastHour div
function clearHour() {
  while (forecastHour.firstChild) {
    forecastHour.removeChild(forecastHour.firstChild);
  }
}

// Populate forecastHour div
function updateHour(jsonWeather) {
  // Reset main forecastHour div
  clearHour();

  // Get current hour
  const dateNow = new Date();
  const hourNow = dateNow.getHours();

  for (let i = hourNow; i < 24; i++) {
    // Create Elements
    const hourDiv = document.createElement('div');
    const hourTime = document.createElement('h2');
    const hourIcon = document.createElement('div');
    const hourTemp = document.createElement('h2');

    hourDiv.classList.add('hour', 'flex', 'flex-row', 'gap-3', 'overflow-auto');
    hourTime.classList.add('hourTime');
    hourIcon.classList.add('hourIcon');
    hourTemp.classList.add('hourTemp');

    // Fetched data
    hourTime.innerText = jsonWeather.forecast.forecastday[0].hour[i].time;
    hourIcon.innerText = 'Icon';
    hourTemp.innerText = jsonWeather.forecast.forecastday[0].hour[i].temp_c;

    // Append fetched data to single div
    hourDiv.appendChild(hourTime);
    hourDiv.appendChild(hourIcon);
    hourDiv.appendChild(hourTemp);

    // Append to main forecastHour div
    forecastHour.appendChild(hourDiv);
  }
}

// Populate HTML with weather data
function updateDiv(jsonWeather) {
  console.log(jsonWeather);

  // Current
  currentCity.innerText = jsonWeather.location.name;
  currentTemp.innerText = `${jsonWeather.current.temp_c}\u00B0C`;
  currentDesc.innerText = jsonWeather.current.condition.text;
  currentHigh.innerText = `${jsonWeather.forecast.forecastday[0].day.maxtemp_c}\u00B0C`;
  currentLow.innerText = `${jsonWeather.forecast.forecastday[0].day.mintemp_c}\u00B0C`;

  // // Forcast Hour
  // updateHour();

  // Forecast Day
  day1Day.innerText = jsonWeather.forecast.forecastday[0].date;
  day1Icon.innerText = 'Icon';
  day1HighC.innerText = `${jsonWeather.forecast.forecastday[0].day.maxtemp_c}\u00B0C`;
  day1LowC.innerText = `${jsonWeather.forecast.forecastday[0].day.mintemp_c}\u00B0C`;

  day2Day.innerText = jsonWeather.forecast.forecastday[1].date;
  day2Icon.innerText = 'Icon';
  day2HighC.innerText = `${jsonWeather.forecast.forecastday[1].day.maxtemp_c}\u00B0C`;
  day2LowC.innerText = `${jsonWeather.forecast.forecastday[1].day.mintemp_c}\u00B0C`;

  day3Day.innerText = jsonWeather.forecast.forecastday[2].date;
  day3Icon.innerText = 'Icon';
  day3HighC.innerText = `${jsonWeather.forecast.forecastday[2].day.maxtemp_c}\u00B0C`;
  day3LowC.innerText = `${jsonWeather.forecast.forecastday[2].day.mintemp_c}\u00B0C`;

  // Wind
  windSpeed.innerText = `${jsonWeather.current.wind_kph}kph`;
  windDir.innerText = jsonWeather.current.wind_dir;
  windDeg.innerText = `${jsonWeather.current.wind_degree}\u00B0C`;

  // Feels Like
  feelsLike.innerText = `${jsonWeather.current.feelslike_c}\u00B0C`;

  // Sun
  sunrise.innerText = jsonWeather.forecast.forecastday[0].astro.sunrise;
  sunset.innerText = jsonWeather.forecast.forecastday[0].astro.sunset;

  // Moon
  illumination.innerText = jsonWeather.forecast.forecastday[0].astro.moon_illumination;
  moonrise.innerText = jsonWeather.forecast.forecastday[0].astro.moonrise;
  moonPhase.innerText = jsonWeather.forecast.forecastday[0].astro.moon_phase;

  // Visibility
  visibility.innerText = `${jsonWeather.current.vis_km}km`;

  // Precipitation
  precipitation.innerText = `${jsonWeather.current.precip_mm}mm`;

  // Humidity
  humidity.innerText = `${jsonWeather.current.humidity}%`;

  // Pressure
  pressure.innerText = `${jsonWeather.current.pressure_mb}hPa`;
}

// Update city list
function updateCity(jsonCity) {
  // Final 2 ('null' & 'based') was not included
  for (let i = 0; i < jsonCity.data.length - 2; i++) {
    locations.push(jsonCity.data[i].city);
  }
  console.log(locations);
}

// Fetch
async function getWeather(location) {
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=9e75879a84fd47acb31141945230407&q=${location}&days=5&aqi=yes&alerts=no`,
      {
        method: 'GET',
        mode: 'cors',
      },
    );
    const json = await data.json();
    updateDiv(json);
    updateHour(json);
    return json;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getCity() {
  try {
    const data = await fetch(
      'https://countriesnow.space/api/v0.1/countries/population/cities',
      {
        method: 'GET',
        mode: 'cors',
      },
    );
    const json = await data.json();
    updateCity(json);
  } catch (err) {
    console.error(err);
    return err;
  }
}

getWeather('Manila');
getCity();

// Autocomplete
const searchBox = document.querySelector('#searchBox');
const resultBox = document.querySelector('#resultBox');

searchBox.addEventListener('input', () => {
  let result = [];
  const input = searchBox.value;
  if (input.length) {
    result = locations.filter((location) => location.toLowerCase().includes(input.toLowerCase()));
  }
  console.log(result);
  clearAutocomplete();
  displayAutocomplete(result);
});

// Look for better implementation of autocomplete box
function clearAutocomplete() {
  while (resultBox.firstChild) {
    resultBox.removeChild(resultBox.firstChild);
  }
}

function displayAutocomplete(result) {
  result.map((value) => {
    const listItem = document.createElement('li');
    listItem.innerText = value;
    listItem.addEventListener('click', () => {
      console.log(listItem.innerText);
      searchBox.value = listItem.innerText;
    });
    resultBox.appendChild(listItem);
  });
  console.log(result);
}

// Form
const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  getWeather(event.target[0].value);
  event.target[0].value = '';
  clearAutocomplete();
});

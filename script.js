// Basic fetch functionality
// Change variable names (json, testDiv)
// Change fetch type
// const testDiv = document.createElement('div');
// document.body.appendChild(testDiv);

// DOM Variables
// Body
const body = document.querySelector('body');

// Search Bar
const searchBar = document.querySelector('#searchBar');

// Autocomplete
const locations = [];
const conditions = [];

// Whole weather info div
const info = document.querySelector('#info');

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
const windArrow = document.querySelector('.direction');

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
// Match condition code for icon
function matchCode(code) {
  if (conditions.length < 1) {
    // eslint-disable-next-line no-console
    console.error('Weather conditions not yet loaded, returning code 1000');
    return 1000;
  }
  return conditions.findIndex((condition) => condition === code);
}

// Reset forecastHour div
function clearHour() {
  while (forecastHour.children[0]) {
    forecastHour.removeChild(forecastHour.children[0]);
  }
}

// Populate forecastHour div
function updateHour(jsonWeather) {
  // Reset main forecastHour div
  clearHour();

  // Get current date
  const dateNow = new Date();
  const hourNow = dateNow.getHours();

  for (let i = hourNow; i < 24; i++) {
    // Create Elements
    const hourDiv = document.createElement('div');
    const hourTime = document.createElement('h2');
    const hourIcon = document.createElement('img');
    const hourTemp = document.createElement('h2');

    hourDiv.classList.add('hour', 'flex', 'flex-col', 'items-center', 'justify-center');
    hourTime.classList.add('flex');
    hourIcon.classList.add('hourIcon');
    hourTemp.classList.add('hourTemp');

    // Fetched data
    hourTime.innerText = (jsonWeather.forecast.forecastday[0].hour[i].time).slice(11);
    hourIcon.src = `./icons/${matchCode(jsonWeather.forecast.forecastday[0].hour[i].condition.code)}.svg`;
    hourTemp.innerText = `${jsonWeather.forecast.forecastday[0].hour[i].temp_c}\u00B0C`;

    // Append fetched data to single div
    hourDiv.appendChild(hourTime);
    hourDiv.appendChild(hourIcon);
    hourDiv.appendChild(hourTemp);

    // Append to main forecastHour div
    forecastHour.appendChild(hourDiv);
  }

  // Count current hourly date elements (excluding header div)
  const elementCount = forecastHour.childElementCount - 1;
  if (elementCount < 24) {
    for (let i = 0; i < (23 - elementCount); i++) {
      // Create Elements
      const hourDiv = document.createElement('div');
      const hourTime = document.createElement('h2');
      const hourIcon = document.createElement('img');
      const hourTemp = document.createElement('h2');

      hourDiv.classList.add('hour', 'flex', 'flex-col', 'items-center', 'justify-center');
      hourTime.classList.add('flex');
      hourIcon.classList.add('hourIcon');
      hourTemp.classList.add('hourTemp');

      // Fetched data
      hourTime.innerText = (jsonWeather.forecast.forecastday[1].hour[i].time).slice(11);
      // console.log(jsonWeather.forecast.forecastday[1].hour[i].time.slice(9, 4));
      hourIcon.src = `./icons/${matchCode(jsonWeather.forecast.forecastday[1].hour[i].condition.code)}.svg`;
      hourTemp.innerText = `${jsonWeather.forecast.forecastday[1].hour[i].temp_c}\u00B0C`;

      // Append fetched data to single div
      hourDiv.appendChild(hourTime);
      hourDiv.appendChild(hourIcon);
      hourDiv.appendChild(hourTemp);

      // Append to main forecastHour div
      forecastHour.appendChild(hourDiv);
    }
  }
}

// Get Wind Direction
function getDirection(angle) {
  if (angle === 0) {
    return 'EAST';
  } if (angle === 90) {
    return 'NORTH';
  } if (angle === 180) {
    return 'WEST';
  } if (angle === 270) {
    return 'SOUTH';
  } if (angle > 0 && angle < 90) {
    return 'NORTHEAST';
  } if (angle > 90 && angle < 180) {
    return 'NORTHWEST';
  } if (angle > 180 && angle < 270) {
    return 'SOUTHWEST';
  } if (angle > 270 && angle < 360) {
    return 'SOUTHEAST';
  }
}

// Populate HTML with weather data
function updateDiv(jsonWeather) {
  console.log(jsonWeather);

  // Current
  currentCity.innerText = jsonWeather.location.name;
  currentTemp.innerText = `${jsonWeather.current.temp_c}\u00B0C`;
  currentDesc.innerText = jsonWeather.current.condition.text;
  currentHigh.innerText = `H: ${jsonWeather.forecast.forecastday[0].day.maxtemp_c}\u00B0C`;
  currentLow.innerText = `L: ${jsonWeather.forecast.forecastday[0].day.mintemp_c}\u00B0C`;

  // // Forcast Hour
  // updateHour();

  // Forecast Day
  day1Day.innerText = jsonWeather.forecast.forecastday[0].date;
  day1Icon.src = `./icons/${matchCode(jsonWeather.forecast.forecastday[0].day.condition.code)}.svg`;
  day1HighC.innerText = `${jsonWeather.forecast.forecastday[0].day.maxtemp_c}\u00B0C`;
  day1LowC.innerText = `${jsonWeather.forecast.forecastday[0].day.mintemp_c}\u00B0C`;

  day2Day.innerText = jsonWeather.forecast.forecastday[1].date;
  day2Icon.src = `./icons/${matchCode(jsonWeather.forecast.forecastday[1].day.condition.code)}.svg`;
  day2HighC.innerText = `${jsonWeather.forecast.forecastday[1].day.maxtemp_c}\u00B0C`;
  day2LowC.innerText = `${jsonWeather.forecast.forecastday[1].day.mintemp_c}\u00B0C`;

  day3Day.innerText = jsonWeather.forecast.forecastday[2].date;
  day3Icon.src = `./icons/${matchCode(jsonWeather.forecast.forecastday[2].day.condition.code)}.svg`;
  day3HighC.innerText = `${jsonWeather.forecast.forecastday[2].day.maxtemp_c}\u00B0C`;
  day3LowC.innerText = `${jsonWeather.forecast.forecastday[2].day.mintemp_c}\u00B0C`;

  // Wind
  windSpeed.innerText = `${jsonWeather.current.wind_kph}kph`;
  windDir.innerText = jsonWeather.current.wind_dir;
  windDeg.innerText = `${jsonWeather.current.wind_degree}\u00B0`;
  console.log(typeof (jsonWeather.current.wind_degree));
  windArrow.style.transform = `rotate(-${(jsonWeather.current.wind_degree) + 45}deg)`;
  windArrow.style.webkitTransform = `rotate(-${(jsonWeather.current.wind_degree) + 45}deg)`;

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

// Fetch Weather
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
    // eslint-disable-next-line no-console
    console.error(err);
    return err;
  }
}

// Update city list
function updateCity(jsonCity) {
  // Final 2 ('null' & 'based') was not included
  for (let i = 0; i < jsonCity.data.length - 2; i++) {
    locations.push(jsonCity.data[i].city.toUpperCase());
  }
  console.log(locations);
}

// Fetch city List
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
    return json;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return err;
  }
}

// Update conditions list
function updateConditions(jsonConditions) {
  for (let i = 0; i < jsonConditions.length; i++) {
    conditions.push(jsonConditions[i].code);
  }
}

// Fetch conditions list
async function getConditions() {
  try {
    const data = await fetch(
      'https://www.weatherapi.com/docs/conditions.json',
      {
        method: 'GET',
        mode: 'cors',
      },
    );
    const json = await data.json();
    updateConditions(json);
    console.log(conditions);
    return json;
  } catch (err) {
    console.error(err);
    return err;
  }
}

getCity();
getConditions().then(() => {
  getWeather('Manila');
});

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

function clearAutocomplete() {
  while (resultBox.firstChild) {
    resultBox.removeChild(resultBox.firstChild);
  }
}

function displayAutocomplete(result) {
  result.map((value) => {
    const listItem = document.createElement('li');
    listItem.innerText = value;
    listItem.classList.add('hover:bg-umber');
    listItem.addEventListener('click', () => {
      searchBox.value = listItem.innerText;
      clearAutocomplete();
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
  info.classList.remove('hidden');
  info.classList.add('grid');
  body.classList.remove('justify-center');
  searchBar.classList.add('mt-4');
});

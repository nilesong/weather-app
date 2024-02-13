// Basic fetch functionality
// Change variable names (json, testDiv)
// Change fetch type
const testDiv = document.createElement('div');
document.body.appendChild(testDiv);

// DOM Variables
// Current
const currentCity = document.querySelector('#currentCity');
const currentTemp = document.querySelector('#currentTemp');
const currentDesc = document.querySelector('#currentDesc');
const currentHigh = document.querySelector('#currentHigh');
const currentLow = document.querySelector('#currentLow');

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

function updateDiv(jsonWeather) {
  console.log(jsonWeather);

  // Current
  currentCity.innerText = jsonWeather.location.name;
  currentTemp.innerText = `${jsonWeather.current.temp_c}\u00B0C`;
  currentDesc.innerText = jsonWeather.current.condition.text;
  currentHigh.innerText = `${jsonWeather.forecast.forecastday[0].day.maxtemp_c}\u00B0C`;
  currentLow.innerText = `${jsonWeather.forecast.forecastday[0].day.mintemp_c}\u00B0C`;

  // Forecast Day
  day1Day.innerHTML = jsonWeather.forecast.forecastday[0].date;
  day1Icon.innerHTML = 'Icon';
  day1HighC.innerHTML = `${jsonWeather.forecast.forecastday[0].day.maxtemp_c}\u00B0C`;
  day1LowC.innerHTML = `${jsonWeather.forecast.forecastday[0].day.mintemp_c}\u00B0C`;

  day2Day.innerHTML = jsonWeather.forecast.forecastday[1].date;
  day2Icon.innerHTML = 'Icon';
  day2HighC.innerHTML = `${jsonWeather.forecast.forecastday[1].day.maxtemp_c}\u00B0C`;
  day2LowC.innerHTML = `${jsonWeather.forecast.forecastday[1].day.mintemp_c}\u00B0C`;

  day3Day.innerHTML = jsonWeather.forecast.forecastday[2].date;
  day3Icon.innerHTML = 'Icon';
  day3HighC.innerHTML = `${jsonWeather.forecast.forecastday[2].day.maxtemp_c}\u00B0C`;
  day3LowC.innerHTML = `${jsonWeather.forecast.forecastday[2].day.mintemp_c}\u00B0C`;

  // Wind
  windSpeed.innerHTML = `${jsonWeather.current.wind_kph}kph`;
  windDir.innerHTML = jsonWeather.current.wind_dir;
  windDeg.innerHTML = `${jsonWeather.current.wind_degree}\u00B0C`;

  // Feels Like
  feelsLike.innerHTML = `${jsonWeather.current.feelslike_c}\u00B0C`;

  // Sun
  sunrise.innerHTML = jsonWeather.forecast.forecastday[0].astro.sunrise;
  sunset.innerHTML = jsonWeather.forecast.forecastday[0].astro.sunset;

  // Moon
  illumination.innerHTML = jsonWeather.forecast.forecastday[0].astro.moon_illumination;
  moonrise.innerHTML = jsonWeather.forecast.forecastday[0].astro.moonrise;
  moonPhase.innerHTML = jsonWeather.forecast.forecastday[0].astro.moon_phase;

  // Visibility
  visibility.innerHTML = `${jsonWeather.current.vis_km}km`;

  // Precipitation
  precipitation.innerHTML = `${jsonWeather.current.precip_mm}mm`;

  // Humidity
  humidity.innerHTML = `${jsonWeather.current.humidity}%`;

  // Pressure
  pressure.innerHTML = `${jsonWeather.current.pressure_mb}hPa`;
}

async function getWeather() {
  try {
    const data = await fetch(
      'http://api.weatherapi.com/v1/forecast.json?key=9e75879a84fd47acb31141945230407&q=London&days=5&aqi=yes&alerts=no',
      {
        method: 'GET',
        mode: 'cors',
      },
    );
    const json = await data.json();
    updateDiv(json);
    return json;
  } catch (err) {
    console.error(err);
    return err;
  }
}

getWeather();

// Autocomplete
const locations = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central Arfrican Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauro', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];
const searchBox = document.querySelector('.searchBox');
const resultBox = document.querySelector('.resultBox');

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

const testDiv = document.createElement('div');
document.body.appendChild(testDiv);

function updateDiv(json) {
  testDiv.innerHTML = json[0].country;
}

async function getWeather() {
  try {
    const data = await fetch(
      'http://api.weatherapi.com/v1/search.json?key=9e75879a84fd47acb31141945230407&q=london',
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

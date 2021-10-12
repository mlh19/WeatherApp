// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
//EventListner--onclick. Grab value from input box to API

// THEN I am presented with current and future conditions for that city and that city is added to the search history
//Fetch data from the API. Current weather and one call  API. api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//city name= var name

// WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//API- feth and 2 .then-console log

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//grab lon/lat from Current Weather and passing it to One Call. Create a var that represents lon/lat to fetch info from One call and
//append this data to my page.

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//Also, append this information to page.

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// need a local storage to store searched cities. Grab stuff from local storage and display in page.

var myAPI = "8ce43231e9bfeecbefc30eede9ec8820";
var fiveDayURL;
var part = "minutely, hourly";
var cityName;
var oneCallURL;


// Makes a network call to the Open Weather API to download the weather for the specified cityName.
function getCoords(cityName) {
  // String Interpolation
  fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myAPI}`;

  fetch(fiveDayURL).then(function (response) {
    if (response.ok) {
      saveCity(cityName);
      response.json().then(function (data) {
        console.log(data);
        var latitude = data.city.coord.lat;
        var longitude = data.city.coord.lon;
        console.log("latitude " + latitude);
        console.log("longitude " + longitude);
        getDailyDays(latitude, longitude);
        for (var i = 1; i < 6; i++) {
          clearDiv("temp" + i);
        }
      });
    }
  });
}

function getDailyDays(latitude, longitude) {
  oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=${part}&appid=${myAPI}`;
  //console.log(oneCallURL);

  //Fetch the API URL.
  fetch(oneCallURL)
    //Then run the fn with response.
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        //Convert response to JSON
        response.json().then(function (data) {
          console.log(data);
          for (let i = 0; i < 6; i++) {
            // dt is the unix time stamp we are converting to an actual date format.
            var date = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
            console.log(date);
            var windSpeed = data.daily[i].wind_speed;
            console.log(windSpeed);
            var maxTemp = data.daily[i].temp.max;
            console.log(maxTemp);
            var humidity = data.daily[i].humidity;
            console.log(humidity);
            // Every weather contains an array of only 1 element.
            var iconName = data.daily[i].weather[0].icon;
            console.log(iconName);
            var iconURL =
              "http://openweathermap.org/img/wn/" + iconName + ".png";
            console.log(iconURL);

            if (i == 0) {
              var forecastCurrentUlID = "temp" + i;
              const forecastCurrentUlEl = document.getElementById(forecastCurrentUlID);

              var dateLabel = document.createElement("li");
              dateLabel.textContent = date;
              forecastCurrentUlEl.appendChild(dateLabel);

              var addImg = document.createElement("img");
              addImg.src = iconURL;
              addImg.alt = "Weather Icon";
              forecastCurrentUlEl.appendChild(addImg);

              //Temp
              var tempLabel = document.createElement("li");
              tempLabel.textContent = "Temp: " + maxTemp + " \xB0F";
              forecastCurrentUlEl.appendChild(tempLabel);

              //Wind
              var windLabel = document.createElement("li");
              windLabel.textContent = "Wind: " + windSpeed + " MPH";
              forecastCurrentUlEl.appendChild(windLabel);

              //Humidity
              var humidityLabel = document.createElement("li");
              humidityLabel.textContent = "Humidity: " + humidity + "%";
              forecastCurrentUlEl.appendChild(humidityLabel);

              // UVI
              var uvi = data.daily[i].uvi;
              var uviLabel = document.createElement("li");
              uviLabel.textContent = "UV Index: " + uvi;
              forecastCurrentUlEl.appendChild(uviLabel);

            } else {
              // Add the other days as small containers.
              var forecastUlID = "temp" + i;
              const forecastUlEl = document.getElementById(forecastUlID);

              var dateLabel = document.createElement("li");
              dateLabel.textContent = date;
              forecastUlEl.appendChild(dateLabel);

              var addImg = document.createElement("img");
              addImg.src = iconURL;
              addImg.alt = "Weather Icon";
              forecastUlEl.appendChild(addImg);

              //Temp
              var tempLabel = document.createElement("li");
              tempLabel.textContent = "Temp: " + maxTemp + " \xB0F";
              forecastUlEl.appendChild(tempLabel);

              //Wind
              var windLabel = document.createElement("li");
              windLabel.textContent = "Wind: " + windSpeed + " MPH";
              forecastUlEl.appendChild(windLabel);

              //Humidity
              var humidityLabel = document.createElement("li");
              humidityLabel.textContent = "Humidity: " + humidity + "%";
              forecastUlEl.appendChild(humidityLabel);
            }
          }
        });
      }
    });
}

function clearDiv(elementID) {
  var ul = document.getElementById(elementID);
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

// Search Button Section
var searchButton = document.getElementById("searchButton");
searchButton.setAttribute("class", "btn btn-info");
searchButton.setAttribute("style", "margin-bottom: 5px");
function searchButtonClicked() {
  // Gets the text inside the input box.
  var city = document.getElementById("cityInputBox").value;
  if (city === "") {
    console.log("User did not enter a city.");
  } else {
    console.log("User entered the city " + city + ".");
    cityName = city;
    // Call the API with the city.
    getCoords(city);
  }
}
searchButton.addEventListener("click", searchButtonClicked);

// Local Storage Section
function saveCity(cityName) {
  // Convert the inputted cityName to capitalized case to avoid saving cities with different casing.
  const upperCaseCity = cityName.toUpperCase();
  // Implement the saving of the cityName using local storage.
  localStorage.setItem("WeatherApp-" + upperCaseCity, upperCaseCity);
  console.log("Saved city: " + upperCaseCity + ".");

  // Reload so that the new city we added gets its own button.
  loadCitiesFromStorage();
}

// Loads all the cities from local storage and creates a button for that city.
function loadCitiesFromStorage() {
  // Get all the keys for local storage, and then ONLY get the ones that follow the filtering which
  // is if the key contains "WeatherApp-".
  var validKeys = Object.keys(localStorage).filter(
    (word) => word.includes("WeatherApp-") === true
  );
  console.log(validKeys);

  // The index to reference each key by.
  var numOfKeys = validKeys.length;
  var amountOfButtons = Math.min(numOfKeys, 8);

  // Clear any existing butons before we re-add them.
  const divEl = document.getElementById("previousSearchButtons");
  while (divEl.firstChild) {
    divEl.removeChild(divEl.firstChild);
  }

  // Create buttons for all of the cities it finds in local storage.
  for (var i = 0; i < amountOfButtons; i++) {
    // Create a button element.
    const button = document.createElement("button");
    button.setAttribute("class", "btn btn-outline-secondary");
    button.setAttribute("style", "margin-bottom: 5px");
    // The getItem is giving me the city name for the current key for this application only.
    button.textContent = localStorage.getItem(validKeys[i]);
    console.log("Found " + button.textContent + " in local storage.");
    // Attach the function to that search button we just created.
    button.addEventListener("click", previousSearchButtonClicked);
    // Add that button to the div to display it.
    divEl.append(button);
  }
}

// Remove all the cities from local storage.
function removeCitiesFromStorage() {
  const validKeys = Object.keys(localStorage).filter(
    (word) => word.includes("WeatherApp-") === true
  );
  const numofKeys = validKeys.length;
  for (var i = 0; i < numofKeys; i++) {
    localStorage.removeItem(validKeys[i]);
  }
}

function previousSearchButtonClicked() {
  // "this" refers to the button that CALLED this function.
  // Get the city from the button's text content.
  console.log(this.textContent);
  getCoords(this.textContent);
}

loadCitiesFromStorage();

// Whenever the cities are loaded from local storage, because they are saved
// into a dictionary, there is no ordering, so when creating the search buttons,
// it is technically getting any 8 cities it finds. This can cause an issue where
// the user might search for a city and it might not show up in the recently searched
// results because it got 8 other cities to load from storage. A possible fix is
// to instead save an array under 1 key. Then we append to that array. The array will
// have ordering, and we just get the last 8 values of that array since the array is
// working as a stack data structure.

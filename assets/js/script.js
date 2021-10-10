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

    fetch(fiveDayURL)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        var latitude = data.city.coord.lat;
                        var longitude = data.city.coord.lon;
                        console.log("latitude " + latitude);
                        console.log("longitude " + longitude);
                        getDailyDays(latitude, longitude);
                        for (var i = 1; i < 6; i++) {
                            clearDiv("temp" + i);
                        }
                    })
            }
        })
}

function getDailyDays(latitude, longitude) {
    oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=${part}&appid=${myAPI}`;

    //Fetch the API URL.
    fetch(oneCallURL)
        //Then run the fn with response.
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                //Convert response to JSON
                response.json()
                    .then(function (data) {
                        console.log(data);
                        for (let i = 0; i < 6; i++) {
                            // dt is the unix time stamp we are converting to an actual date format.
                            var date = (moment.unix(data.daily[i].dt).format("MM/DD/YYYY"));
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
                            var iconURL = "http://openweathermap.org/img/wn/" + iconName + ".png";
                            console.log(iconURL);

                            if (i == 0) {
                                // Add the first day on the top container.
                            } else {
                                // Add the other days as small containers.
                                var temperature = "temp" + i;
                                console.log(temperature);
                                var dayListItemEl = document.createElement('li');
                                dayListItemEl.textContent = date;
                                document.getElementById(temperature).appendChild(dayListItemEl);
                                var addImg = document.createElement('img');
                                addImg.src = iconURL;
                                addImg.alt = "Weather Icon";
                                document.getElementById(temperature).appendChild(addImg);
                            }
                        }
                    })
            }
        })
}


function clearDiv(elementID) {
    var ul = document.getElementById(elementID);
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

var searchButton = document.getElementById("searchButton");
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

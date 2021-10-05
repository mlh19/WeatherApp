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
var fiveDay;
var cityName = "austin";
var part = "minutely, hourly";

var oneCall;


function getCoords() {
    fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myAPI}`;



    fetch(fiveDay)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                })
            }
        })
    }

getCoords();
        

    function getOneDay(latitude, longitude) {
        oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${myAPI}`;
        fethch(oneCall)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
    
                        latitude = data.cityName.getCoords.lat;
                        longitude = data.cityName.getCoords.lon;

                        getOneCall(latitude, longitude);
                    })

                }

            })
        }







function oneDay() {
    // oneDay = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={myAPI}`
}
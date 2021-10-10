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
                response.json()
                .then(function(data) {
                    console.log(data);
                    var latitude = data.city.coord.lat;
                    
                       var longitude = data.city.coord.lon;
                       console.log("latitude " + latitude);
                       console.log("longitude " + longitude);
                       getOneDay(latitude, longitude);

    clearDiv("temp1");
    clearDiv("temp2");
    clearDiv("temp3");
    clearDiv("temp4");
    clearDiv("temp5");

                })
            }
            
        })
    }

getCoords();
        

    function getOneDay(latitude, longitude) {
        oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=${part}&appid=${myAPI}`;

        //Fetch the API URL.
        fetch(oneCall)
            //Then run the fn with response.
            .then(function(response) {
                
                if (response.ok) {
                    console.log(response);
                    //Convert response to JSON
                    response.json()
                    .then(function(data) {
                        console.log(data);
                         
                        var todaysDate = (moment.unix(data.daily[0].dt).format("MM/DD/YYYY"));
                         console.log(todaysDate);
                         var currentCity = cityName;
                         console.log(currentCity);
                         var currentWind = data.current.wind_speed;
                         console.log(currentWind);
                         var currentUVI = data.current.uvi;
                         console.log(currentUVI);
                         var currentTemp = data.current.temp;
                         console.log(currentTemp);
                         var currentHumidity = data.current.humidity;
                         console.log(currentHumidity);
                         var icon = data.current.weather[0].icon;
                         console.log(icon);
                         var currentIcon = "http://openweathermap.org/img/wn/" + icon + ".png";
                         console.log(currentIcon);
                         day2(latitude, longitude);          
                    })

                }

            })
        }

        function day2(latitude, longitude) {
            oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=${part}&appid=${myAPI}`;
    
            //Fetch the API URL.
            fetch(oneCall)
                //Then run the fn with response.
                .then(function(response) {
                    
                    if (response.ok) {
                        console.log(response);
                        //Convert response to JSON
                        response.json()
                        .then(function(data) {
                            console.log(data);
                            for (let i = 1; i <= 5; i++){
   
                           
                            var date2 = (moment.unix(data.daily[i].dt).format("MM/DD/YYYY"));
                             console.log(date2);
                             var wind2 = data.daily[i].wind_speed;
                             console.log(wind2);
                            
                             var temp2 = data.daily[i].temp.max;
                             console.log(temp2);
                             var humidity2 = data.daily[i].humidity;
                             console.log(humidity2);
                             var icon2 = data.daily[i].weather[0].icon;
                             console.log(icon2);
                             var icon2a = "http://openweathermap.org/img/wn/" + icon2 + ".png";
                             console.log(icon2a);
                             var temperature = "temp" + [i];
                             console.log(temperature);
                             var day2_add = document.createElement('li');
          
            day2_add.textContent = date2;
                           document.getElementById(temperature).appendChild(day2_add);
              var addImg = document.createElement('img');
              addImg.src = icon2a;
              addImg.alt = "Weather Icon";
              document.getElementById(temperature).appendChild(addImg);

                            } 
                            })

                        }
        
                    })
                }


                function clearDiv(elementID) {
                    var ul = document.getElementById(elementID);
                    while(ul.firstChild) {
                        ul.removeChild(ul.firstChild);
                    }
                }
                        
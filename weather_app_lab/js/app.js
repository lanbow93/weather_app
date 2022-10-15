// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3c2c378d932ce2a3619cd17e3119a611
// https://api.openweathermap.org/data/2.5/weather?lat=32.7762719&lon=-96.7968559&appid=3c2c378d932ce2a3619cd17e3119a611

// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}<< To get Lat and Long
// http://api.openweathermap.org/geo/1.0/direct?q=dallas,TX,US&limit=1&appid=3c2c378d932ce2a3619cd17e3119a611  << Test

// Information I will need but comes from external sources
let weatherData;
let locationInformation;
let cityInput;
let stateInput;
let latitude;
let longitude;

// Locations I will frequently access
$frequentLocations = {
    // Top heading section
    cityLabel: $("#city"),
    stateLabel: $("$state"),
    // Form section
    cityTextBox: $("#cityTextBox"),
    stateTextBox: $("#drop-down"),
    cityLookupButton: $("#citySubmit"),
    zipCodeTextBox: $("#zipBox"),
    zipCodeLookupBotton: $("#zipCodeSearch"),
    // Main display area
    weatherImage: $("#weatherImage"),
    mainTempReading: $("#mainTemp"),
    feelTempReading: $("#feelTemp"),
    minTempReading: $("#minTemp"),
    maxTempReading: $("#maxTemp"),
    humidityReading: $("#humidity"),
    windSpeedReading: $("#windSpeed"),
    hourDisplay: $("#hour"),
    minuteDisplay: $("#minute"),
    minuteDisplay: $("second"),
    descriptionDisplay: $("description")
}


function grabLocationInformation(event) {
    const Promise = $.ajax({
        // url: `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=1&appid=3c2c378d932ce2a3619cd17e3119a611`
    })

    Promise.then(
        (data) => {
            locationInformation = data;
        },
        (error) => {
            console.log(`ERROR MESSAGE: ${error}`)
        }
    )
}

function grabWeatherInformation() {

    
  const Promise = $.ajax({
    // url: `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=3c2c378d932ce2a3619cd17e3119a611`,
  });

  Promise.then(
    (data) => {
        console.log(data)
    },
    (error) => {
        console.log(`Alert Error: ${error}`);
    }
  );

}


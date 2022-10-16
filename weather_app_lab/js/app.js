// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3c2c378d932ce2a3619cd17e3119a611
// https://api.openweathermap.org/data/2.5/weather?lat=32.7762719&lon=-96.7968559&appid=3c2c378d932ce2a3619cd17e3119a611 <<Test

// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}<< To get Lat and Long
// http://api.openweathermap.org/geo/1.0/direct?q=Dallas,TX,US&limit=1&appid=3c2c378d932ce2a3619cd17e3119a611  << Test

// Information I will need but comes from external sources
let weatherData;
let locationInformation;
let cityInput;
let stateInput;
let zipCode;
let longitude;
let latitude;
const stateList = [ "AK - Alaska", "AL - Alabama", "AR - Arkansas", "AZ - Arizona", "CA - California", "CO - Colorado", "CT - Connecticut", "DC - District of Columbia","DE - Delaware", "FL - Florida", "GA - Georgia", "HI - Hawaii", "IA - Iowa", "ID - Idaho", "IL - Illinois", "IN - Indiana", "KS - Kansas", "KY - Kentucky", "LA - Louisiana", "MA - Massachusetts", "MD - Maryland", "ME - Maine", "MI - Michigan", "MN - Minnesota", "MO - Missouri", "MS - Mississippi", "MT - Montana", "NC - North Carolina", "ND - North Dakota", "NE - Nebraska", "NH - New Hampshire", "NJ - New Jersey", "NM - New Mexico", "NV - Nevada", "NY - New York", "OH - Ohio", "OK - Oklahoma", "OR - Oregon", "PA - Pennsylvania", "RI - Rhode Island", "SC - South Carolina", "SD - South Dakota", "TN - Tennessee", "TX - Texas", "UT - Utah", "VA - Virginia", "VI - Virgin Islands", "VT - Vermont", "WA - Washington", "WI - Wisconsin", "WV - West Virginia", "WY - Wyoming"]

// Locations I will frequently access
$frequentLocations = {
    // Top heading section
    cityLabel: $("#city"), // text()
    stateLabel: $("#state"), // text()
    // Form section
    cityTextBox: $("#cityTextBox"), // .val()
    stateTextBox: $("#drop-down"), // .val()
    cityLookupButton: $("#citySubmit"), 
    zipCodeTextBox: $("#zipBox"), //.val
    zipCodeLookupButton: $("#zipCodeSearch"),
    // Main display area
    weatherImage: $("img"), // src alt
    mainTempReading: $("#mainTemp"), // .text()
    feelTempReading: $("#feelTemp"), // .text()
    minTempReading: $("#minTemp"), // .text()
    maxTempReading: $("#maxTemp"), // .text()
    humidityReading: $("#humidity"), // .text()
    windSpeedReading: $("#windSpeed"), // .text()
    timeDisplay: $("#time"), // .text()
    descriptionDisplay: $("#description") // .text()
}
// Iterating though state list and adding in State options
for (state of stateList){
    const newOption = document.createElement("option");
    newOption.value = `${state.split('').slice(0,2).join('')}`; 
    newOption.text = state.split('').slice(5).join('');
    $frequentLocations.stateTextBox.append(newOption)
}

// Click listener when city/state is submitted
$("#cityForm").on("submit", grabLocationInformation);
function grabInfoByCity() {
    enteredCity = $frequentLocations.cityTextBox;
    enteredState = $frequentLocations.stateTextBox;
    cityInput = enteredCity.val(); // Setting variable to submitted city
    stateInput = enteredState.val(); // Setting variable to entered state
}

// Taking user input and getting lon and lat for weather API
function grabLocationInformation(event) {
    event.preventDefault();
    grabInfoByCity();
    const Promise = $.ajax({
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${stateInput},US&limit=1&appid=3c2c378d932ce2a3619cd17e3119a611`
    })

    Promise.then(
        (data) => {
            longitude = data[0].lon;
            latitude = data[0].lat;
            locationInformation = data;
            grabWeatherInformation()
        },
        (error) => {
            console.log(`ERROR MESSAGE: ${error}`)
        }
    )
    
}

function tempConversion(kelvinTemp){
    let celsius = kelvinTemp - 273;
    let exactFarenheit = (celsius * (9/5) + 32)
    return Math.floor(exactFarenheit*10) / 10;
}

// Icon url: http://openweathermap.org/img/wn/10d@2x.png

function updateDisplay(){
    $frequentLocations.mainTempReading.text(tempConversion(weatherData.main.temp));
    $frequentLocations.feelTempReading.text(tempConversion(weatherData.main.feels_like));
    $frequentLocations.minTempReading.text(tempConversion(weatherData.main.temp_min));
    $frequentLocations.maxTempReading.text(tempConversion(weatherData.main.temp_max));
    $frequentLocations.humidityReading.text(weatherData.main.humidity);
    $frequentLocations.windSpeedReading.text((Math.floor(((weatherData.wind.speed * 2.23694)*10)))/10);
    $frequentLocations.descriptionDisplay.text(weatherData.weather[0].description.toUpperCase());
    $frequentLocations.cityLabel.text(cityInput);
    $frequentLocations.stateLabel.text(stateInput);
    $frequentLocations.weatherImage.attr("src",`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);

}



function grabWeatherInformation() {

    const Promise = $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3c2c378d932ce2a3619cd17e3119a611`
    });

  Promise.then(
    (success) => {
        weatherData = success;
        updateDisplay();
        currentTime();
    },
    (fail) => {
        console.log(`Alert Error: ${fail}`);
    }
  );
}

function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    $frequentLocations.timeDisplay.text(time); 
    let t = setTimeout(function(){ currentTime() }, 1000);
  }

  console.log(locationInformation)



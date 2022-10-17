// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3c2c378d932ce2a3619cd17e3119a611
// https://api.openweathermap.org/data/2.5/weather?lat=32.7762719&lon=-96.7968559&appid=3c2c378d932ce2a3619cd17e3119a611 <<Test

// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}<< To get Lat and Long
// http://api.openweathermap.org/geo/1.0/direct?q=Dallas,TX,US&limit=1&appid=3c2c378d932ce2a3619cd17e3119a611  << Test

// Information I will need but comes from external sources
let weatherData;
let forecastData;
let locationInformation;
let cityInput;
let state;
let zipCode;
let longitude;
let latitude;
const stateList = [ "AK - Alaska", "AL - Alabama", "AR - Arkansas", "AZ - Arizona", "CA - California", "CO - Colorado", "CT - Connecticut", "DC - District of Columbia","DE - Delaware", "FL - Florida", "GA - Georgia", "HI - Hawaii", "IA - Iowa", "ID - Idaho", "IL - Illinois", "IN - Indiana", "KS - Kansas", "KY - Kentucky", "LA - Louisiana", "MA - Massachusetts", "MD - Maryland", "ME - Maine", "MI - Michigan", "MN - Minnesota", "MO - Missouri", "MS - Mississippi", "MT - Montana", "NC - North Carolina", "ND - North Dakota", "NE - Nebraska", "NH - New Hampshire", "NJ - New Jersey", "NM - New Mexico", "NV - Nevada", "NY - New York", "OH - Ohio", "OK - Oklahoma", "OR - Oregon", "PA - Pennsylvania", "PR - Puerto Rico", "RI - Rhode Island", "SC - South Carolina", "SD - South Dakota", "TN - Tennessee", "TX - Texas", "UT - Utah", "VA - Virginia", "VI - Virgin Islands", "VT - Vermont", "WA - Washington", "WI - Wisconsin", "WV - West Virginia", "WY - Wyoming"]

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
    descriptionDisplay: $("#description"), // .text()
    // Footer display area
    dayOneMax: $("#dayOneMax"),
    dayOneMin: $("#dayOneMin"),
    dayTwoMax: $("#dayTwoMax"),
    dayTwoMin: $("#dayTwoMin"),
    dayThreeMax: $("#dayThreeMax"),
    dayThreeMin: $("#dayThreeMin"),
    dayFourMax: $("#dayFourMax"),
    dayFourMin: $("#dayFourMin"),
    dayFiveMax: $("#dayFiveMax"),
    dayFiveMin: $("#dayFiveMin"),
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
    state = enteredState.val(); // Setting variable to entered state
}

// Click listener when zip Code is submitted
$("#zipForm").on("submit", grabLocationInformation);
function grabInfoByZip() {
    enteredZipCode = $frequentLocations.zipCodeTextBox;
    zipCode = enteredZipCode.val();
    console.log(zipCode)

}

// Taking user input and getting lon and lat for weather API
function grabLocationInformation(event) {
    event.preventDefault();
    let Promise;
    let eventId = event.target[0].id;
    grabInfoByCity();
    grabInfoByZip();

    // If user submitted 
    if(eventId === "cityTextBox") {

        Promise = $.ajax({
            url: `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${state},US&limit=1&appid=3c2c378d932ce2a3619cd17e3119a611`
        })

        Promise.then(
            (data) => {
                if(!data.length){
                    alert("THIS CITY DOESN'T EXIST. PLEASE TRY AGAIN!")
                }

                longitude = data[0].lon;
                latitude = data[0].lat;
                locationInformation = data;
                grabWeatherInformation();
                console.log(data)
            },
            (error) => {
                console.log(`ERROR MESSAGE: ${error}`);
            }
        )

    } else {
        Promise = $.ajax({
            url: `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=3c2c378d932ce2a3619cd17e3119a611`
        })

        Promise.then(
            (data) => {
                
                longitude = data.lon;
                latitude = data.lat;
                locationInformation = data;
                zipConversion()
                grabWeatherInformation();
                
            },
            (error) => {
                console.log(`ERROR MESSAGE: ${error}`);
            }
        )
    }
}

function tempConversion(kelvinTemp){
    let celsius = kelvinTemp - 273;
    let exactFarenheit = (celsius * (9/5) + 32)
    return Math.floor(exactFarenheit*10) / 10;
}

//Converting zip code into state
function zipConversion() {
    
    if (zipCode >= 35000 && zipCode <= 36999) {
        state = 'AL';
    } else if (zipCode >= 99500 && zipCode <= 99999) {
        state = 'AK';
    } else if (zipCode >= 85000 && zipCode <= 86999) {
        state = 'AZ';
    } else if (zipCode >= 71600 && zipCode <= 72999) {
        state = 'AR';
    } else if (zipCode >= 90000 && zipCode <= 96699) {
        state = 'CA';
    } else if (zipCode >= 80000 && zipCode <= 81999) {
        state = 'CO';
    } else if ((zipCode >= 6000 && zipCode <= 6389) || (zipCode >= 6391 && zipCode <= 6999)) {
        state = 'CT';
    } else if (zipCode >= 19700 && zipCode <= 19999) {
        state = 'DE';
    } else if (zipCode >= 32000 && zipCode <= 34999) {
        state = 'FL';
    } else if ( (zipCode >= 30000 && zipCode <= 31999) || (zipCode >= 39800 && zipCode <= 39999) ) {
        state = 'GA';
    } else if (zipCode >= 96700 && zipCode <= 96999) {
        state = 'HI';
    } else if (zipCode >= 83200 && zipCode <= 83999) {
        state = 'ID';
    } else if (zipCode >= 60000 && zipCode <= 62999) {
        state = 'IL';
    } else if (zipCode >= 46000 && zipCode <= 47999) {
        state = 'IN';
    } else if (zipCode >= 50000 && zipCode <= 52999) {
        state = 'IA';
    } else if (zipCode >= 66000 && zipCode <= 67999) {
        state = 'KS';
    } else if (zipCode >= 40000 && zipCode <= 42999) {
        state = 'KY';
    } else if (zipCode >= 70000 && zipCode <= 71599) {
        state = 'LA';
    } else if (zipCode >= 3900 && zipCode <= 4999) {
        state = 'ME';
    } else if (zipCode >= 20600 && zipCode <= 21999) {
        state = 'MD';
    } else if ( (zipCode >= 1000 && zipCode <= 2799) || (zipCode == 5501) || (zipCode == 5544 ) ) {
        state = 'MA';
    } else if (zipCode >= 48000 && zipCode <= 49999) {
        state = 'MI';
    } else if (zipCode >= 55000 && zipCode <= 56899) {
        state = 'MN';
    } else if (zipCode >= 38600 && zipCode <= 39999) {
        state = 'MS';
    } else if (zipCode >= 63000 && zipCode <= 65999) {
        state = 'MO';
    } else if (zipCode >= 59000 && zipCode <= 59999) {
        state = 'MT';
    } else if (zipCode >= 27000 && zipCode <= 28999) {
        state = 'NC';
    } else if (zipCode >= 58000 && zipCode <= 58999) {
        state = 'ND';
    } else if (zipCode >= 68000 && zipCode <= 69999) {
        state = 'NE';
    } else if (zipCode >= 88900 && zipCode <= 89999) {
        state = 'NV';
    } else if (zipCode >= 3000 && zipCode <= 3899) {
        state = 'NH';
    } else if (zipCode >= 7000 && zipCode <= 8999) {
        state = 'NJ';
    } else if (zipCode >= 87000 && zipCode <= 88499) {
        state = 'NM';
    } else if ( (zipCode >= 10000 && zipCode <= 14999) || (zipCode == 6390) || (zipCode == 501) || (zipCode == 544) ) {
        state = 'NY';
    } else if (zipCode >= 43000 && zipCode <= 45999) {
        state = 'OH';
    } else if ((zipCode >= 73000 && zipCode <= 73199) || (zipCode >= 73400 && zipCode <= 74999) ) {
        state = 'OK';
    } else if (zipCode >= 97000 && zipCode <= 97999) {
        state = 'OR';
    } else if (zipCode >= 15000 && zipCode <= 19699) {
        state = 'PA';
    } else if (zipCode >= 300 && zipCode <= 999) {
        state = 'PR';
    } else if (zipCode >= 2800 && zipCode <= 2999) {
        state = 'RI';
    } else if (zipCode >= 29000 && zipCode <= 29999) {
        state = 'SC';
    } else if (zipCode >= 57000 && zipCode <= 57999) {
        state = 'SD';
    } else if (zipCode >= 37000 && zipCode <= 38599) {
        state = 'TN';
    } else if ( (zipCode >= 75000 && zipCode <= 79999) || (zipCode >= 73301 && zipCode <= 73399) ||  (zipCode >= 88500 && zipCode <= 88599) ) {
        state = 'TX';
    } else if (zipCode >= 84000 && zipCode <= 84999) {
        state = 'UT';
    } else if (zipCode >= 5000 && zipCode <= 5999) {
        state = 'VT';
    } else if ( (zipCode >= 20100 && zipCode <= 20199) || (zipCode >= 22000 && zipCode <= 24699) || (zipCode == 20598) ) {
        state = 'VA';
    } else if ( (zipCode >= 20000 && zipCode <= 20099) || (zipCode >= 20200 && zipCode <= 20599) || (zipCode >= 56900 && zipCode <= 56999) ) {
        state = 'DC';
    } else if (zipCode >= 98000 && zipCode <= 99499) {
        state = 'WA';
    } else if (zipCode >= 24700 && zipCode <= 26999) {
        state = 'WV';
    } else if (zipCode >= 53000 && zipCode <= 54999) {
        state = 'WI';
    } else if (zipCode >= 82000 && zipCode <= 83199) {
        state = 'WY';
    } else {
        state = 'none';
        console.log('No state found matching', zipCode);
    }
    return state;
}

// Icon url: http://openweathermap.org/img/wn/10d@2x.png
// Update screen with the right stats
function updateDisplay(){
    $frequentLocations.mainTempReading.text(tempConversion(weatherData.main.temp));
    $frequentLocations.feelTempReading.text(tempConversion(weatherData.main.feels_like));
    $frequentLocations.minTempReading.text(tempConversion(weatherData.main.temp_min));
    $frequentLocations.maxTempReading.text(tempConversion(weatherData.main.temp_max));
    $frequentLocations.humidityReading.text(weatherData.main.humidity);
    $frequentLocations.windSpeedReading.text((Math.floor(((weatherData.wind.speed * 2.23694)*10)))/10);
    $frequentLocations.descriptionDisplay.text(weatherData.weather[0].description.toUpperCase());
    $frequentLocations.cityLabel.text(weatherData.name);
    $frequentLocations.stateLabel.text(state);
    $frequentLocations.weatherImage.attr("src",`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);

}


// Reaching weather api and updating the display and starting clock function
function grabWeatherInformation() {

    const Promise = $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3c2c378d932ce2a3619cd17e3119a611`
    });

  Promise.then(
    (success) => {
        weatherData = success;
        fiveDayForecast();
        updateDisplay();
        currentTime();
    },
    (fail) => {
        console.log(`Alert Error: ${fail}`);
        
    }
  );
}
// `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3c2c378d932ce2a3619cd17e3119a611`
// `https://api.openweathermap.org/data/2.5/forecast?lat=32.7762719&lon=-96.7968559&appid=3c2c378d932ce2a3619cd17e3119a611`

// Api to get the five day forecast
function fiveDayForecast(){

    const Promise = $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3c2c378d932ce2a3619cd17e3119a611`
    })

    Promise.then(
        (data) => {
            forecastData = data; 
            for (let element of data.list){
                console.log(element)
            }
        },
        (error) => {
            console.log(`Alert Error: ${fail}`);
        }
    )
    
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


// Breaking down returned object into 5 min/max combos
function parsingWeather(){
    // Taking the UNIX timestamp and converting it to weekday number
    new Date(data.list[i].dt * 1000).getDay() // https://stackoverflow.com/questions/49608768/convert-unix-timestamp-to-week-day (understanding this code)
}


// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3c2c378d932ce2a3619cd17e3119a611
// https://api.openweathermap.org/data/2.5/weather?lat=32.7762719&lon=-96.7968559&appid=3c2c378d932ce2a3619cd17e3119a611

// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}<< To get Lat and Long
// http://api.openweathermap.org/geo/1.0/direct?q=dallas,TX,US&limit=1&appid=3c2c378d932ce2a3619cd17e3119a611  << Test

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
    weatherImage: $("#weatherImage"), // src alt
    mainTempReading: $("#mainTemp"), // .text()
    feelTempReading: $("#feelTemp"), // .text()
    minTempReading: $("#minTemp"), // .text()
    maxTempReading: $("#maxTemp"), // .text()
    humidityReading: $("#humidity"), // .text()
    windSpeedReading: $("#windSpeed"), // .text()
    hourDisplay: $("#hour"), // .text()
    minuteDisplay: $("#minute"), // .text()
    minuteDisplay: $("second"), // .text()
    descriptionDisplay: $("description") // .text()
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
    cityInput = enteredCity.val();
    stateInput = enteredState.val();
    console.log(stateInput)
    $frequentLocations.cityLabel.text(cityInput)
    $frequentLocations.stateLabel.text(stateInput)
}

function grabLocationInformation(event) {
    event.preventDefault();
    grabInfoByCity();
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


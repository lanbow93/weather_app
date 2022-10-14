// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=3c2c378d932ce2a3619cd17e3119a611  << To get weather
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=1&appid=3c2c378d932ce2a3619cd17e3119a611 << To get Lat and Long

// Information I will need but comes from external sources
let weatherData;
let locationInformation;
let cityInput;
let stateInput;
let latitude;
let longitude;

// Locations I will frequently access
 

//
function grabLocationInformation(event) {
    const Promise = $.ajax({
        // url: `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=3c2c378d932ce2a3619cd17e3119a611`
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

grabInformation();

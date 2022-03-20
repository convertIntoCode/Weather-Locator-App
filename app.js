// Declaring the variables
let temperature = document.querySelector(".temp");
let unitTemp = document.querySelector(".unitTemp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let locationIcon = document.querySelector(".weather-icon");
let isCelsium = true; // counter boolean check

//Asked permition for location
window.addEventListener("load", () => {
  callApi();
});

// To change C to F onClick
window.addEventListener("click", () => {
  callApi();
});

//call API
function callApi() {
  let apiUrlEnd;
  let unit;
  if (isCelsium) {
    apiUrlEnd = "units=" + "metric"; // celsium api
    unit = "°C";
    isCelsium = !isCelsium;
  } else {
    apiUrlEnd = "units=" + "imperial"; // fahrenheit api
    unit = "°F";
    isCelsium = !isCelsium;
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //longtitude and latitude
      let lon = "lon=" + position.coords.longitude;
      let lat = "lat=" + position.coords.latitude;

      // API ID - Key from openweather.org
      let appId = "appid=" + "157da836c5f7aa4464a2a4b33af59660";
      let apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&${appId}&` +
        apiUrlEnd;
      fetch(apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let currTemp = (temperature.textContent =
            Math.floor(data.main.temp) + unit);

          summary.textContent = data.weather[0].description;
          loc.textContent = data.name + ", " + data.sys.country;
          const icon = data.weather[0].icon;
          locationIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png"/>`;
        });
    });
  }
}

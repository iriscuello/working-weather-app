let now = new Date();
let hour = now.getHours();
let min = now.getMinutes();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let dayOfMonth = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let date = document.querySelector("#date");
date.innerHTML = `${day} ${month} ${dayOfMonth}, ${hour}:${min}`;

function getCurrentTemp(event) {
  event.preventDefault();
  let input = document.querySelector("#inputCity1");
  let city = input.value;
  let apiKey = "&appid=f6daddd2490e280fc02eb01a9840f82a";
  let units = "&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}${apiKey}${units}`;
  axios.get(apiUrl).then(getData);

  let div = document.querySelector(".col-lg-6");
  div.innerHTML = input.value.toUpperCase();
}

function getData(response) {
  let span = document.querySelector("#currentTemp");
  span.innerHTML = Math.round(response.data.main.temp) + "℃";
  let liHigh = document.querySelector("#hiTemp");
  liHigh.innerHTML = "Hi: " + Math.round(response.data.main.temp_max) + "℃";
  let liLow = document.querySelector("#lowTemp");
  liLow.innerHTML = "Low: " + Math.round(response.data.main.temp_min) + "℃";
  let descrip = document.querySelector("#description");
  let str = response.data.weather[0].description;
  descrip.innerHTML = str.substring(0, 1).toUpperCase() + str.substring(1);
}

let form = document.querySelector("form");
form.addEventListener("submit", getCurrentTemp);

function getLocationTemp(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "f6daddd2490e280fc02eb01a9840f82a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentLocation);
}

function getLatLong(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocationTemp);
}

function currentLocation(response) {
  console.log(response);
  let div = document.querySelector(".col-lg-6");
  div.innerHTML = response.data.name.toUpperCase();
  let span = document.querySelector("#currentTemp");
  span.innerHTML = Math.round(response.data.main.temp) + "℃";
  let liHigh = document.querySelector("#hiTemp");
  liHigh.innerHTML = "Hi: " + Math.round(response.data.main.temp_max) + "℃";
  let liLow = document.querySelector("#lowTemp");
  liLow.innerHTML = "Low: " + Math.round(response.data.main.temp_min) + "℃";
  let descrip = document.querySelector("#description");
  let str = response.data.weather[0].description;
  descrip.innerHTML = str.substring(0, 1).toUpperCase() + str.substring(1);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getLatLong);

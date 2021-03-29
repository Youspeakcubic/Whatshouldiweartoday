const fetchData = () => {
  let locInput = document.getElementById("LocationInput").value;
  if (locInput == ""){
    document.getElementById("LocationInput").placeholder = "Please enter a location";
  }
  else {
  var url = new URL("https://api.openweathermap.org/data/2.5/weather?"),
      params = {q: locInput, units:"imperial", appid: "1c33075c4655c574d406a15a068b5ca8"}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  fetch(url)
    .then(response => response.json())
    .then (data => distribute(data))
  }
}
const distribute = (data) => {
  let weatherData = {
    temperature: data.main.temp,
    minimum: data.main.temp_min,
    maximum: data.main.temp_max,
    humidity: data.main.humidity,
    weather: data.weather[0].main,
    weatherType: data.weather[0].description,
    wind: data.wind.speed
  }
    document.getElementById("container").style.display = "none";
    document.getElementById("weatherContainer").style.display = "block";
    document.getElementById("detailContainer").style.display = "block";
  for (const property in weatherData) {
      let detailLi = document.createElement("h4");
      let ul = document.createElement("UL");
      console.log(`${property}: ${weatherData[property]}`);
      detailLi.appendChild(document.createTextNode(`${property}: ${weatherData[property]}`));
      ul.appendChild(detailLi);
      document.getElementById("list").appendChild(ul)
  }
}
const returnHome = () => {
  document.getElementById("list").innerHTML = "";
  document.getElementById("container").style.display = "block";
  document.getElementById("weatherContainer").style.display = "none";
  document.getElementById("detailContainer").style.display = "none";
}

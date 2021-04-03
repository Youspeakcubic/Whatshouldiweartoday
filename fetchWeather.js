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
  }
    document.getElementById("container").style.display = "none";
    document.getElementById("weatherContainer").style.display = "block";
  for (const property in weatherData) {
      let detailLi = document.createElement("li");
      let listUL = document.createElement("UL");
      console.log(`${property}: ${weatherData[property]}`);
      detailLi.appendChild(document.createTextNode(`${property}: ${weatherData[property]}`));
      listUL.appendChild(detailLi);
      document.getElementById("list").appendChild(listUL)
  }
  const detail = () => {
    if (weatherData.temperature > 65 ) {
      document.getElementById("summary").appendChild(document.createTextNode("The weather today is warm, wear something light."))
    }
    else if (weatherData.temperature < 65 ) {
      document.getElementById("summary").appendChild(document.createTextNode("The weather today is cold, wear something heavy."))
    }
    if (weatherData.humidity > 50){
      document.getElementById("summary").appendChild(document.createTextNode("Today is very humid, wear something breathable."))
    }
    else if (weatherData.humidity < 50) {
      document.getElementById("summary").appendChild(document.createTextNode("Today is dry, wear something to keep you insulated, and drink plenty of water."))
    }
    if (weatherData.weather == "Clear") {
      document.getElementById("summary").appendChild(document.createTextNode("The sky is clear, Expect to get a lot of sun today, remember to wear sunscreen."))
    }
    else if (weatherData.weather == "Cloudy") {
      document.getElementById("summary").appendChild(document.createTextNode("The sky is cloudy, rain is possible."))
    }
  }
  detail();
}
const returnHome = () => {
  document.getElementById("list").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
  document.getElementById("container").style.display = "block";
  document.getElementById("weatherContainer").style.display = "none";
  document.getElementById("detailContainer").style.display = "none";
}

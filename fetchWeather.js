const fetchData = () => {
  let locInput = document.getElementById("LocationInput").value;
  if (locInput == ""){
    document.getElementById("LocationInput").placeholder = "Please enter a location"
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
  console.log(data.main.temp);
  console.log(data.main.temp_min);
  console.log(data.main.temp_max);
  console.log(data.main.humidity);
  console.log(data.weather[0].main);
  console.log(data.weather[0].description);
  console.log(data.wind.speed);
}

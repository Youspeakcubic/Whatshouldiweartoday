const fetchData = () => {
  //the function firstly grabs the location inputted once the button is pressed
  let locInput = document.getElementById("LocationInput").value;
  if (locInput == ""){
    //checking if input form is empty and stopping the function
    document.getElementById("LocationInput").placeholder = "Please enter a location";
  }
  else {
    //function takes 3 parameters to make the api query, locInput (location inputted by user), Units which by default is imperial, and the api key.
  var url = new URL("https://api.openweathermap.org/data/2.5/weather?"),
      params = {q: locInput, units:"imperial", appid: "1c33075c4655c574d406a15a068b5ca8"}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    //we are appending the parameters to the url we defined to create a new url with our user inputted and static parameters.
  fetch(url)
    //once we fetch, we then take that response and parse it into json, we then use our callback for processing our data ( distribute() )
    .then(response => response.json())
    .then (data => distribute(data))
  }
}
const distribute = (data) => {
  //with the data from the api, we make an object with the data we need for the web app.
  let weatherData = {
    temperature: data.main.temp,
    minimum: data.main.temp_min,
    maximum: data.main.temp_max,
    humidity: data.main.humidity,
    weather: data.weather[0].main,
  }
  //once we get to this point in the application we have all the data we need in the location our user wanted, so we switch divs in html by making our homepage div hidden and displaying our data div.
    document.getElementById("container").style.display = "none";
    document.getElementById("weatherContainer").style.display = "block";
    //This for loop creates a text node for each property in our object and appends it to an LI element in html and then appends that to our UL element. This is done independently for each property.
  for (const property in weatherData) {
      let detailLi = document.createElement("li");
      let listUL = document.createElement("UL");
      console.log(`${property}: ${weatherData[property]}`);
      detailLi.appendChild(document.createTextNode(`${property}: ${weatherData[property]}`));
      listUL.appendChild(detailLi);
      document.getElementById("list").appendChild(listUL)
  }
  //These are a series of if states that allow us to differientiate the data and give a short summary of what the data would mean for our user.
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
//when the user wants to enter a new location the app empties the html of our detail divs, and reverses the hiding of our home div while not displaying the detail container.
const returnHome = () => {
  document.getElementById("list").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
  document.getElementById("container").style.display = "block";
  document.getElementById("weatherContainer").style.display = "none";
  document.getElementById("detailContainer").style.display = "none";
}

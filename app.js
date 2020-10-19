const express = require("express");
const app = express(); // Initialized the new express app
const https = require("https"); // Native module for making API calls
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

// GET for HomePage
app.post("/", function(req, res) {

  var city = req.body.city;

  // Making API call to openWeather website for the data
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=6e8811157f4bf96288a48c9e309b4362&units=metric"
  https.get(url, function(response) {


    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      const minTemp = weatherData.main.temp_min;
      const maxTemp = weatherData.main.temp_max;
      const avgTemp = weatherData.main.temp;
      const pressure = weatherData.main.pressure;
      const hum = weatherData.main.humidity;
      const description = weatherData.weather[0].description;


      res.write('<h1 style="tex-align:center; font-family:cursive">The current weather of ' + city + ' is</h1>')
      res.write("<p>Description : " + description +"</p>");
      res.write('<p>Minimum Temperature : '+ minTemp +' degree celcius</p>');
      res.write("<p>Maximum Temperature : "+ maxTemp +" degree celcius </p>");
      res.write("<p>Average Temperature : "+ avgTemp +" degree celcius </p>");
      res.write("<p>Pressure : "+ pressure +" pascal </p>");
      res.write("<p>Humidity : "+ hum +" % </p>");

      res.write('<img src='+ imageURL +' style="background-color:#d9e4dd">');
      res.send();
    })

  })

})

// Creating a port
app.listen(3000, function () {
  console.log("Server is running on port 3000");
})

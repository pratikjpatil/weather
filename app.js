const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


var description;
var temp;
var url;
var city;
var icon;

app.get('/', function(req,res){

  res.sendFile(__dirname+"/index.html");
});



app.post('/', function(req,res){

  city = req.body.cityName;

  url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=APIKEY";
  https.get(url, function(response){

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        temp = weatherData.main.temp;
        description = weatherData.weather[0].description
        icon = weatherData.weather[0].icon
        var iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";


        res.write("<h1>Weather Stats</h1>");
        res.write("<img src="+iconUrl+">");

        res.write("<br>The weather in "+"<h3>"+city+"</h3>"+" is "+description+" and the temperature is "+"<h3>"+temp+"</h3>");

        res.send();
        console.log(temp);
        console.log(description);
      });

  });




});




app.listen(3000, function(){
  console.log("server running on port 3000");
});

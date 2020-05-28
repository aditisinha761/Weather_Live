var express = require("express")
var https = require("https")
var bodyparser= require("body-parser")
var app = express();
app.use(bodyparser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/HTML/index.html")
});
app.post("/" , (req,res)=>{
    const query = req.body.cityName
    const apiKey= "450d83be6010ad451d0ca39fb6e77e55"
    const unit = "metric"
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apiKey +"&units="+ unit +""
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            const temp=weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write("<p>The weather is currently" + weatherDescription + "</p>")
            res.write("<h1> The Temperature in "+ query +" is " + temp + " degree celcius. </h1>")
            res.write("<img src=" + imageURL + ">")
            res.send()
        })
    })
})
app.listen(8000,()=>{
    console.log("server started");
});
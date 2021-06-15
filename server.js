const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const cors = require('cors');
app.use(cors()); // after you initialize your express app instance
require('dotenv').config();
const axios = require('axios');
const weatherData = require('./assets/weather.json');
const PORT = process.env.PORT;
const WEATHER_BIT_KET = process.env.WEATHER_BIT_KET;

// a server endpoint
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World');// our endpoint function response
  });

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (lat && lon){
    
    // const weatherBitUrl = `https://api.weatherbit.io/v2.0/current?key=
    // ${WEATHER_BIT_KET}&lat=${lat}&lon=${lon}`;
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHER_BIT_KET}&include=minutely`
    
    
    axios.get(weatherBitUrl).then(response => {
      const resData = response.data.data.map((obj) => new Forecast(obj));
      res.json(resData)
    }).catch(error => {
      res.send(error.message)
    })
    // res.json(resData);
  } else {
    res.send('please provide the proper lat and lon');
  }
// const resData = weatherData.data.map((obj) => new Forecast(obj));
// res.json(resData);
});
   
//the modeling of data
class Forecast {
  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.date = weatherData.date;
  }
}
app.listen(PORT, ()=> {
  console.log(`Server started on ${PORT}`)
}); // kick start the express server to work

//http://localhost:8080/weather?lat=35.78&lon=-78.64

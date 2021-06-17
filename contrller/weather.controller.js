const axios = require('axios');
// const weatherData = require('../assets/weather.json');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const foreCast = require('../models/weather.model');

const weatherController = (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
  
    if (lat && lon){
    
      const weatherBitUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
      console.log(weatherBitUrl);
      axios.get(weatherBitUrl).then(response => {
        const resData = response.data.data.map((obj) => new foreCast(obj));
        res.json(resData)
      }).catch(error => {
        res.send(error.message)
      })
    } else {
      res.send('please provide the proper lat and lon');
    }
  };

  module.exports = weatherController;
const axios = require('axios');
// const weatherData = require('../assets/weather.json');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const foreCast = require('../models/weather.model');

const weatherController = (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
  
    if (lat && lon){
    
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHER_BIT_KEY}&include=minutely`
      
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
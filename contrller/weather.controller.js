const axios = require('axios');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const foreCast = require('../models/weather.model');

const Cache = require('../helper/cache');
// init the model blue print cache to contains our cache information
// when the server is close the data will deleted from the cache object
const cacheObj = new Cache();

const weatherController = (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  /*
   - first check the cache contains the location
   - if the location is stored in our object, then return the weather
     property value to our user.
   - if we don't have the location stored in our object, then request that data from the weather bit API, and then store the location and the data in the object.
   - add a time out to our cache object to clear the cache
  */
  const requestKey = `weather-${lat}-${lon}`;
  console.log(cacheObj[requestKey]);
  if (lat && lon) {
    // first check the cache contains the location.
    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey] < 86400000)) {
      res.json(cacheObj[requestKey])
    } else {
      // if we don't have the location stored in our object, then request that data from the weather bit API
      const weatherBitUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
      axios.get(weatherBitUrl).then(response => {
        const resData = response.data.data.map((obj) => new foreCast(obj));
        // store the location and the data in the object.
        cacheObj[requestKey] = resData;
        cacheObj[requestKey].timestamp = Date.now();
        res.json(resData)
      }).catch(error => {
        res.send(error.message)
      });
    }

  } else {
    res.send('please provide the proper lat and lon');
  }
};

module.exports = weatherController;
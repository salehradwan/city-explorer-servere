//the modeling of data
class Forecast {
    constructor(weatherData) {
      this.description = weatherData.weather.description;
      this.date = weatherData.datetime;
    }
  }
// to make it to other 
  module.exports = Forecast;
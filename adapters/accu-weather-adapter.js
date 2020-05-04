const lodash = require('lodash');
const get = lodash.get;

const emptyWeatherObject = require('./empty-weather-object.js');

class AccuWeatherAdapter {
  constructor(accuWeatherApiService) {
    this.accuWeatherApiService = accuWeatherApiService;
  }

  async getWeather(cityName) {}
}

module.exports = {
  AccuWeatherAdapter: AccuWeatherAdapter,
}

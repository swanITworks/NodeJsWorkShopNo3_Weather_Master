const lodash = require('lodash');
const get = lodash.get;

const emptyWeatherObject = require('./empty-weather-object.js');

class OpenWeatherMapAdapter {
  constructor(openWeatherMapAdapter) {
    this.openWeatherMapAdapter = openWeatherMapAdapter;
  }

  async getWeather(cityName) {}
}

module.exports = {
  OpenWeatherMapAdapter: OpenWeatherMapAdapter,
}
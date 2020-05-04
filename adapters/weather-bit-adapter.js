const moment = require('moment-timezone');
const lodash = require('lodash');
const get = lodash.get;

const emptyWeatherObject = require('./empty-weather-object.js');

class WeatherBitAdapter {
  constructor(weatherBitApiService) {
    this.weatherBitApiService = weatherBitApiService;
  }

  async getWeather(cityName) {}
}

module.exports = {
  WeatherBitAdapter: WeatherBitAdapter
}

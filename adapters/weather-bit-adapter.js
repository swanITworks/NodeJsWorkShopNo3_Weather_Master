const moment = require('moment-timezone');
const lodash = require('lodash');
const get = lodash.get;

const emptyWeatherObject = require('./empty-weather-object.js');

class WeatherBitAdapter {
  constructor(weatherBitApiService) {
    this.weatherBitApiService = weatherBitApiService;
  }

  async getWeather(cityName) {
   const result = await this.weatherBitApiService.getCurrent(cityName).then(data => data).catch(err=>console.log(err));
   return result;
  }
}

module.exports = {
  WeatherBitAdapter: WeatherBitAdapter
}

const lodash = require('lodash');
const get = lodash.get;

const emptyWeatherObject = require('./empty-weather-object.js');

class OpenWeatherMapAdapter {
    constructor(openWeatherMapAdapter) {
        this.openWeatherMapAdapter = openWeatherMapAdapter;
    }

    async getWeather(cityName) {
        const result = await this.openWeatherMapAdapter.getWeather(cityName).then(data => data).catch(err => console.log(err))
        return result;
    }
}

module.exports = {
    OpenWeatherMapAdapter: OpenWeatherMapAdapter,
}
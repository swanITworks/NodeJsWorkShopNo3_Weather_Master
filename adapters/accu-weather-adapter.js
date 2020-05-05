const lodash = require('lodash');
const get = lodash.get;
const dotenv = require('dotenv');
dotenv.config();

const emptyWeatherObject = require('./empty-weather-object.js');

class AccuWeatherAdapter {
    constructor(accuWeatherApiService) {
        this.accuWeatherApiService = accuWeatherApiService;
    }

    async getWeather(cityName) {
        if (process.env.ACCU_WEATHER_MOCK == 'false') {
            const locationId = await this.accuWeatherApiService.getLocation(cityName).then(data => data[0].Key).catch(err => console.log(err));
            const data = await this.accuWeatherApiService.getCurrentConditions(locationId).then(data => data).catch(err => console.log(err));
            const result = (data) => {
                const [objectWithData] = [...data];
                let objectToUpdate = {...emptyWeatherObject};
                let updatedObject = {
                    lastObservationTime: new Date(objectWithData.LocalObservationDateTime),
                    location: { cityName: cityName, countryCode: null },
                    weather: {
                        currentTemperature: null,
                            minTemperature: null,
                            maxTemperature: null,
                            units: null,
                            description: null,
                            iconUrl: null
                    }
                }
                console.log(updatedObject);
                return objectWithData
            }
            return result(data);
        } else {
            const result = await this.accuWeatherApiService.getCurrentConditions().then(data => data).catch(err => console.log(err));
            return result;
        }
    }
}

module.exports = {
    AccuWeatherAdapter: AccuWeatherAdapter,
}

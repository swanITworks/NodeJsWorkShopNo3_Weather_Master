const fetch = require('node-fetch');
const {openWeatherMapCurrentData} = require('./../routes/weather-mocks');

class OpenWeatherMapApiService {
    constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
        this.iconsBaseUrl = iconsBaseUrl;
        this.apiBaseUrl = apiBaseUrl;
        this.apiKey = apiKey;
    }
    'api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}'
    async getWeather(cityName) {
        const response = await fetch(`${this.apiBaseUrl}/weather?q=${cityName}&appid=${this.apiKey}`, {
            method: 'GET',
        }).then(response => {
            if (!response) {
                throw new Error('blad')
            }
            return response.json();
        });
        return response;
    }

    getIconUrl(iconCode) {
        return iconCode ? `${this.iconsBaseUrl}/${iconCode}@2x.png` : null;
    }
}

class OpenWeatherMapMockService {
    async getWeather(cityName) {

        const response = await fetch('http://localhost:3000/mocks/openweathermap_current.json', {
            method: 'GET',
        })
            .then(response => {
                if (!response) {
                    throw new Error('blad')
                }
                return response.json();
            })
            .catch(err => console.log(err.message));

        return response;
    }

    getIconUrl(iconCode) {
        return iconCode
            ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
            : null;
    }
}

module.exports = {
    OpenWeatherMapApiService: OpenWeatherMapApiService,
    OpenWeatherMapMockService: OpenWeatherMapMockService,
}

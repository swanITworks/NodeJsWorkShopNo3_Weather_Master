const fetch = require('node-fetch');

class WeatherBitApiService {
    constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
        this.iconsBaseUrl = iconsBaseUrl;
        this.apiBaseUrl = apiBaseUrl;
        this.apiKey = apiKey;
    }

    async getCurrent(cityName) {
        const response = await fetch(this.apiBaseUrl + '/current' + '?key=' + this.apiKey + '&city=' + cityName, {
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
        return iconCode ? `${this.iconsBaseUrl}/${iconCode}.png` : null;
    }
}

class WeatherBitMockService {
    async getCurrent(cityName) {

        const response = await fetch('http://localhost:3000/mocks/weatherbit_current.json', {
            method: 'GET',
        }).then(response => {
            if (!response) {
                throw new Error('blad')
            }
            return response.json();
        }).catch(err => console.log(err.message));
        return response;
    }

    getIconUrl(iconCode) {
        return iconCode
            ? `https://weatherbit.io/static/img/icons/${iconCode}.png`
            : null;
    }
}

module.exports = {
    WeatherBitApiService: WeatherBitApiService,
    WeatherBitMockService: WeatherBitMockService,
}

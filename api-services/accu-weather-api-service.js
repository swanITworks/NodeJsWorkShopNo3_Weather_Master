const fetch = require('node-fetch');

class AccuWeatherApiService {
    constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
        this.iconsBaseUrl = iconsBaseUrl;
        this.apiBaseUrl = apiBaseUrl;
        this.apiKey = apiKey;
    }

    /**
     * Returns location information for given city search
     * @param {string} cityName
     */
   async getLocation(cityName) {
        const response = await fetch(this.apiBaseUrl + '/locations/v1/cities/search?apikey=' + this.apiKey + '&q='+cityName)
            .then(response => {
                if (!response) {
                    throw new Error('error response from AcuWeather Api Service')
                }
                return response.json();
            }).catch(err=>console.log(err.message));
        return response;
    }

    /**
     * Returns current weather conditions for given location
     * @param {string} locationId - retuned from @getLocation API request
     */
    async getCurrentConditions(locationId) {
        const response = await fetch(this.apiBaseUrl + '/currentconditions/v1/'+ locationId + '?apikey=' + this.apiKey)
            .then(response => {
                if (!response) {
                    throw new Error('error response from AcuWeather current Api Service')
                }
                return response.json();
            }).catch(err=>console.log(err.message));
        return response;
    }

    /**
     * Returns such information as minimum and maximum temperature forecast
     * @param {string} locationId - returned from @getLocation API request
     */
    async getDailyForecast(locationId) {
        const metric = true;
        const response = await fetch(this.apiBaseUrl + '/forecasts/v1/daily/1day/'+ locationId + '?apikey=' + this.apiKey + '&metric=' + metric )
            .then(response => {
                if (!response) {
                    throw new Error('error response from AcuWeather Daily Api Service')
                }
                return response.json();
            }).catch(err=>console.log(err.message));
        return response;
    }

    getIconUrl(iconCode) {
        if (!iconCode) {
            return null;
        }

        const fullIconCode = iconCode.toString().padStart(2, '0');
        return `${this.iconsBaseUrl}/${fullIconCode}-s.png`;
    }
}

class AccuWeatherMockService {
    async getCurrentConditions(locationId = 'Warszawa') {
        const response = await fetch('http://localhost:3000/mocks/accuweather_current.json', {
            method: 'GET',
        }).then(response => {
            if (!response) {
                throw new Error('blad')
            }
            return response.json();
        }).catch(err => console.log(err.message));
        return response;
    }

    async getDailyForecast(locationId) {
        return response.json();
    }

    async getLocation(cityName) {
        return response.json();
    }

    getIconUrl(iconCode) {
        const fullIconCode = iconCode.toString().padStart(2, '0');
        return iconCode
            ? `https://developer.accuweather.com/sites/default/files/${fullIconCode}-s.png`
            : null;
    }
}

module.exports = {
    AccuWeatherApiService: AccuWeatherApiService,
    AccuWeatherMockService: AccuWeatherMockService,
}

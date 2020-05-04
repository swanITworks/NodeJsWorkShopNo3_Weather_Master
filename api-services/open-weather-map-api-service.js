const fetch = require('node-fetch');

class OpenWeatherMapApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  async getWeather(cityName) {
    return response.json();
  }

  getIconUrl(iconCode) {
    return iconCode ? `${this.iconsBaseUrl}/${iconCode}@2x.png` : null;
  }
}

class OpenWeatherMapMockService {
  async getWeather(cityName) {
    return response.json();
  }

  getIconUrl(iconCode) {
    return iconCode
      ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      : null;
  }
}

module.exports ={
  OpenWeatherMapApiService: OpenWeatherMapApiService,
  OpenWeatherMapMockService: OpenWeatherMapMockService,
}

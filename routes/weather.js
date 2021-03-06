const express = require('express');
const weather = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const {OpenWeatherMapAdapter} = require('../adapters/open-weather-map-adapter.js');
const {WeatherBitAdapter} = require('../adapters/weather-bit-adapter.js');
const {AccuWeatherAdapter} = require('../adapters/accu-weather-adapter.js');

const {OpenWeatherMapApiService, OpenWeatherMapMockService} = require('../api-services/open-weather-map-api-service.js');
const {WeatherBitApiService, WeatherBitMockService} = require('../api-services/weather-bit-api-service.js');
const {AccuWeatherApiService, AccuWeatherMockService} = require('../api-services/accu-weather-api-service.js');


// === APPLICATION BOOTSTRAP

/*
 By default all APIs will respond with hardcoded json mock data. Set each API to false in order to use real endpoint. 
 Beware of requet number limits per day.
 */

const openWeatherService =
    process.env.OPEN_WEATHER_MAP_MOCK === 'true'
        ? new OpenWeatherMapMockService()
        : new OpenWeatherMapApiService(
        process.env.OPEN_WEATHER_MAP_ICON_BASE_URL,
        process.env.OPEN_WEATHER_MAP_API_BASE_URL,
        process.env.OPEN_WEATHER_MAP_API_KEY,
        );

const weatherBitService =
    process.env.WEATHER_BIT_MOCK === 'true'
        ? new WeatherBitMockService()
        : new WeatherBitApiService(
        process.env.WEATHER_BIT_ICON_BASE_URL,
        process.env.WEATHER_BIT_API_BASE_URL,
        process.env.WEATHER_BIT_API_KEY,
        );

const accuWeatherService =
    process.env.ACCU_WEATHER_MOCK === 'true'
        ? new AccuWeatherMockService()
        : new AccuWeatherApiService(
        process.env.ACCU_WEATHER_ICON_BASE_URL,
        process.env.ACCU_WEATHER_API_BASE_URL,
        process.env.ACCU_WEATHER_API_KEY,
        );

const openWeatherMapAdapter = new OpenWeatherMapAdapter(openWeatherService);
const weatherBitAdapter = new WeatherBitAdapter(weatherBitService);
const accuWeatherAdapter = new AccuWeatherAdapter(accuWeatherService);

weather.get('/', async (req, res) => {
    const locationSearch = 'Warszawa'; // take it from request params

    const [openWeatherMap, weatherBit, accuWeather] = await Promise.all([
        openWeatherMapAdapter.getWeather(locationSearch),
        weatherBitAdapter.getWeather(locationSearch),
        accuWeatherAdapter.getWeather(locationSearch),
    ])
        .catch(err => res.json(err.message));

    res.json({openWeatherMap, weatherBit, accuWeather});
});

module.exports = {
    weather
};
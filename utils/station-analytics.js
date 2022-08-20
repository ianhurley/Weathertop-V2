"use strict";

const logger = require('../utils/logger');

const conversion = require('../utils/conversion.js');

const stationAnalytics = {

  updateWeather(station) {
    if (station.readings.length > 0) {
      const latestReading = station.readings[station.readings.length - 1];
      
      station.code = latestReading.code;
      station.weather = conversion.codeWeather(station.code);
      
      station.tempC = latestReading.temperature;
      station.tempF = conversion.calcFahrenheit(station.tempC);
      
      station.wind = latestReading.windSpeed;
      station.beaufort = conversion.calcBeaufort(station.wind);
      
      station.pressure = latestReading.pressure;
      
      return latestReading;
    }
  },
};

module.exports = stationAnalytics;

 
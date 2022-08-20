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
      
      station.direction = latestReading.windDirection;
      station.compass = conversion.compassDirection(station.direction);
      
      station.pressure = latestReading.pressure;
      
      station.windChill = stationAnalytics.windChill(latestReading.temperature, latestReading.windSpeed);
      station.windChillFixed = station.windChill.toFixed(1);
      
      return latestReading;
    }
  },
  
  windChill(tempC,windSpeed){
    return 13.12 + 0.6215 * tempC -  11.37 * (Math.pow(windSpeed, 0.16)) + 0.3965 * tempC * (Math.pow(windSpeed, 0.16));
  },
  
};

module.exports = stationAnalytics;

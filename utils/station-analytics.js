"use strict";

const logger = require('../utils/logger');

const conversion = require('../utils/conversion.js');

const stationAnalytics = {

  updateWeather(station) {
    if (station.readings.length > 0) {
      const latestReading = station.readings[station.readings.length - 1];
      
      station.code = latestReading.code;
      station.weather = conversion.codeWeather(station.code);
      station.icon = conversion.codeIcon(station.code);
      
      station.tempC = latestReading.temperature;
      station.tempF = conversion.calcFahrenheit(station.tempC);
      
      station.wind = latestReading.windSpeed;
      station.beaufort = conversion.calcBeaufort(station.wind);
      
      station.direction = latestReading.windDirection;
      station.compass = conversion.compassDirection(station.direction);
      
      station.pressure = latestReading.pressure;
      
      station.windChill = stationAnalytics.windChill(latestReading.temperature, latestReading.windSpeed);
      station.windChillFixed = station.windChill.toFixed(1);
      
      station.maxTemp = stationAnalytics.getMaxTemp(station);
      station.minTemp = stationAnalytics.getMinTemp(station);
      
      station.maxWind = stationAnalytics.getMaxWind(station);
      station.minWind = stationAnalytics.getMinWind(station);
      
      station.maxPressure = stationAnalytics.getMaxPressure(station);
      station.minPressure = stationAnalytics.getMinPressure(station);
      
      return latestReading;
    }
  },
  
  windChill(tempC,windSpeed){
    return 13.12 + 0.6215 * tempC -  11.37 * (Math.pow(windSpeed, 0.16)) + 0.3965 * tempC * (Math.pow(windSpeed, 0.16));
  },
  
  getMaxTemp(station){
    let maxTemp = null;
    if(station.readings.length > 0) {
    maxTemp = station.readings[0];
    for (let i=1; i<station.readings.length; i++) {
    if (station.readings[i].temperature > maxTemp.temperature) {
    maxTemp = station.readings[i];
    }
    }
    }
    return maxTemp;
  },
  
  getMinTemp(station){
    let minTemp = null;
    if(station.readings.length > 0) {
    minTemp = station.readings[0];
    for (let i=1; i<station.readings.length; i++) {
    if (station.readings[i].temperature < minTemp.temperature) {
    minTemp = station.readings[i];
    }
    }
    }
    return minTemp;
  },
  
  getMaxWind(station){
    let maxWind = null;
    if(station.readings.length > 0) {
    maxWind = station.readings[0];
    for (let i=1; i<station.readings.length; i++) {
    if (station.readings[i].windSpeed > maxWind.windSpeed) {
    maxWind = station.readings[i];
    }
    }
    }
    return maxWind;
  },
  
  getMinWind(station){
    let minWind = null;
    if(station.readings.length > 0) {
    minWind = station.readings[0];
    for (let i=1; i<station.readings.length; i++) {
    if (station.readings[i].windSpeed < minWind.windSpeed) {
    minWind = station.readings[i];
    }
    }
    }
    return minWind;
  },
  
  getMaxPressure(station){
    let maxPressure = null;
    if(station.readings.length > 0) {
    maxPressure = station.readings[0];
    for (let i=1; i<station.readings.length; i++) {
    if (station.readings[i].pressure > maxPressure.pressure) {
    maxPressure = station.readings[i];
    }
    }
    }
    return maxPressure;
  },
  
  getMinPressure(station){
    let minPressure = null;
    if(station.readings.length > 0) {
    minPressure = station.readings[0];
    for (let i=1; i<station.readings.length; i++) {
    if (station.readings[i].pressure < minPressure.pressure) {
    minPressure = station.readings[i];
    }
    }
    }
    return minPressure;
  },
  
  /*tempTrend(station){
    let trend = 0;
    if (station.readings.length > 2) {
      const values = {station.readings.get(station.readings.length -3).temperature, station.readings.get(station.readings.length -2).temperature, station.readings.get(station.readings.length -1).temperature};
      trend = calcTrend(values);
    }
    return trend;
  },*/
  
};

module.exports = stationAnalytics;

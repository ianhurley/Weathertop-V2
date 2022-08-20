'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const stationAnalytics = require('../utils/station-analytics.js');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const stations = stationStore.getAllStations();
    for (const station of stations) {
      const latestWeather = stationAnalytics.updateWeather(station);
      station.latestWeather = latestWeather;
    }
    logger.info(stations);
    const viewData = {
      title: 'Station Dashboard',
      stations: stations,
    };
    logger.info('about to render', stationStore.getAllStations());
    response.render('dashboard', viewData);
  },
  
  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      readings: [],
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
  
};

module.exports = dashboard;

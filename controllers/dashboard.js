'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const stationAnalytics = require('../utils/station-analytics.js');

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
};

module.exports = dashboard;

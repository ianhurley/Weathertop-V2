'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const stationAnalytics = require('../utils/station-analytics.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const stations = stationStore.getUserStations(loggedInUser.id);
    
    //stations.sort((a, b) => a.name.localeCompare(b.name));
    
    for (const station of stations) {
      const latestWeather = stationAnalytics.updateWeather(station);
      station.latestWeather = latestWeather;
    }
    logger.info(stations);
    const viewData = {
      title: 'Station Dashboard',
      stations: stationStore.getUserStations(loggedInUser.id),
    };
    logger.info('about to render', stationStore.getAllStations());
    response.render('dashboard', viewData);
  },
  
  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  
};

module.exports = dashboard;

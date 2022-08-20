'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');



const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);
    
    const station = stationStore.getStation(stationId);
    
    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId),
    };
    response.render('station', viewData);
  },
  
  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;
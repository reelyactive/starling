/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */


const express = require('express');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const EmulationManager = require('./emulationmanager');


/**
 * Starling Class
 * Emulator of wireless device transmissions.
 * @param {Object} options The options as a JSON object.
 * @constructor
 */
class Starling extends EventEmitter {

  /**
   * Starling constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    super();

    let self = this;
    options = options || {};

    if(options.app) {
      configureExpress(options.app, self);
    }

    this.emulations = new EmulationManager({ emulator: self });
  }


  /**
   * Emulate based on the given options.
   * @param {Object} options The emulation options.
   * @param {callback} callback Function to call on completion.
   */
  emulate(options, callback) {
    options = options || {};

    this.emulations.create(options, function(status, data) {
      callback(data);
    });
  }

}


/**
 * Configure the routes of the API.
 * @param {Express} app The Express app.
 * @param {Starling} instance The Starling instance.
 */
function configureExpress(app, instance) {
  app.use(function(req, res, next) {
    req.starling = instance;
    next();
  });
  app.use('/emulations', require('./routes/emulations'));
  app.use('/', express.static(path.resolve(__dirname + '/../web')));
}


module.exports = Starling;

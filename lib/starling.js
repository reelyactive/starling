/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */


const EventEmitter = require('events').EventEmitter;


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
    options = options || {};
  }

}


module.exports = Starling;

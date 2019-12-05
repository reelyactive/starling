/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */


/**
 * EmulationManager Class
 * Manages the emulation of wireless devices.
 */
class EmulationManager {

  /**
   * EmulationManager constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options, database) {
    options = options || {};
  }

  /**
   * Create emulation(s).
   * @param {Object} emulation The emulation of the device(s).
   * @param {callback} callback Function to call on completion.
   */
  create(emulation, callback) {
    let emulations = {};

    // TODO

    return callback(201, { emulations: emulations });
  }

  /**
   * Retrieve an existing emulation.
   * @param {String} id The id of the emulated device.
   * @param {String} type The type of id of the emulated device.
   * @param {callback} callback Function to call on completion.
   */
  retrieve(id, type, callback) {
    let identifier = id + '/' + type;
    let emulations = {};

    emulations[identifier] = {}; // TODO

    return callback(200, { emulations: emulations });
  }

  /**
   * Create/replace an emulation.
   * @param {String} id The id of the emulated device.
   * @param {String} type The type of id of the emulated device.
   * @param {Object} emulation The emulation of the device.
   * @param {callback} callback Function to call on completion.
   */
  replace(id, type, emulation, callback) {
    let identifier = id + '/' + type;
    let emulations = {};

    emulations[identifier] = {}; // TODO

    //return callback(201, { emulations: emulations });
    return callback(200, { emulations: emulations });
  }

  /**
   * Remove an existing emulation.
   * @param {String} id The id of the emulated device.
   * @param {String} type The type of id of the emulated device.
   * @param {callback} callback Function to call on completion.
   */
  remove(id, type, callback) {
    return callback(200);
  }

}


module.exports = EmulationManager;

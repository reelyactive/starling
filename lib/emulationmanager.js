/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */


const Raddec = require('raddec');


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

    this.emulator = options.emulator;
  }

  /**
   * Create emulation(s).
   * @param {Object} emulation The emulation of the device(s).
   * @param {callback} callback Function to call on completion.
   */
  create(emulation, callback) {
    let emulations = {};

    emulateShowcaseKit(this.emulator, emulation); // TODO: other options

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


/**
 * Emulate a showcase kit.
 * @param {Starling} instance The Starling instance.
 * @param {Object} options The emulation options.
 */
function emulateShowcaseKit(instance, options) {
  let transmitterIds = [ 'fa4eda7a0000', 'fa4eda7a0001', 'fa4eda7a0002',
                         'fa4eda7a0003', 'fa4eda7a0004', 'fa4eda7a0005',
                         'fa4eda7a0006', 'fa4eda7a0007', 'fa4eda7a0008',
                         'fa4eda7a0009', 'fa4eda7a000a', 'fa4eda7a000b',
                         'fa4eda7a000c' ];
  let transmitterIdTypes = [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ];
  let receiverIds = [ '001bc509408fa4e0', '001bc509408fa4e1',
                      '001bc509408fa4e2' ];
  let receiverIdTypes = [ 1, 1, 1 ];
  let delayMilliseconds = Math.floor(1000 / transmitterIds.length);

  function emitNextRaddec(transmitterIndex) {
    let raddec = new Raddec({
        transmitterId: transmitterIds[transmitterIndex],
        transmitterIdType: transmitterIdTypes[transmitterIndex]
    });

    let receiverIndex = Math.floor(Math.random() * receiverIds.length);
    let rssi = Math.round((Math.random() * 20) - 70); // TODO: observe options
    raddec.addDecoding({
        receiverId: receiverIds[receiverIndex],
        receiverIdType: receiverIdTypes[receiverIndex],
        rssi: rssi
    });

    let nextTransmitterIndex = ++transmitterIndex % transmitterIds.length;
    setTimeout(emitNextRaddec, delayMilliseconds, nextTransmitterIndex);
    instance.emit('raddec', raddec);
  }

  emitNextRaddec(0);
}


module.exports = EmulationManager;

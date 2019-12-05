/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */


const express = require('express');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const Raddec = require('raddec');


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
  }


  /**
   * Emulate based on the given options.
   * @param {Object} options The emulation options.
   */
  emulate(options) {
    options = options || {};

    // TODO: in future observe options and support different scenarios
    emulateShowcaseKit(this, options);
  }

}


/**
 * Configure the routes of the API.
 * @param {Express} app The Express app.
 * @param {Chickadee} instance The Chickadee instance.
 */
function configureExpress(app, instance) {
  app.use(function(req, res, next) {
    req.starling = instance;
    next();
  });
  app.use('/', express.static(path.resolve(__dirname + '/../web')));
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


module.exports = Starling;

/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var util = require('util');
var events = require('events');
var time = require('./common/util/time');

var DEFAULT_TRANSMITTERS = [ "001bc50940100000" ];
var DEFAULT_RECEIVERS = [ "001bc50940800000",
                          "001bc50940800001",
                          "001bc50940800002", ];
var DEFAULT_TIMING = { minVisibleMilliseconds: 60000,
                       maxVisibleMilliseconds: 300000,
                       minInvisibleMilliseconds: 60000,
                       maxInvisibleMilliseconds: 300000 };
var DEFAULT_ZONES = [ { receivers: DEFAULT_RECEIVERS,
                        timing: DEFAULT_TIMING } ];
var DEFAULT_PARAMETERS = { transmitters: DEFAULT_TRANSMITTERS,
                           zones: DEFAULT_ZONES }; 
var DEFAULT_MIN_BLINK_MILLISECONDS = 1000;
var DEFAULT_MAX_BLINK_MILLISECONDS = 3000;


/**
 * SequenceGenerator Class
 * Generates a sequence of events based on the given parameters.
 * @param {Object} params The parameters as a JSON object.
 * @constructor
 */
function SequenceGenerator(params) {
  var self = this;
  params = params || DEFAULT_PARAMETERS;

  prepareZones(self, params.zones, function() {
    prepareTransmitters(self, params.transmitters);
  });

  events.EventEmitter.call(this);
};
util.inherits(SequenceGenerator, events.EventEmitter);


/**
 * Prepare the array of zones.
 * @param {SequenceGenerator} instance The given SequenceGenerator instance.
 * @param {Array} zones The given zones.
 * @param {function} callback Function to call on completion.
 */
function prepareZones(instance, zones, callback) {
  instance.zones = [];

  for(var cZone = 0; cZone < zones.length; cZone++) {
    var zone = {};
    zone.receivers = [];
    for(var cReceiver = 0; cReceiver < zones[cZone].receivers.length; cReceiver++) {
      var receiver = {};
      receiver.identifier = {};
      receiver.identifier.value = zones[cZone].receivers[cReceiver]; // Assume string
      receiver.identifier.type = "Undefined";
      zone.receivers.push(receiver);
    }
    zone.timing = zones[cZone].timing;
    instance.zones.push(zone);
  }

  callback();
}


/**
 * Prepare the array of transmitters.
 * @param {SequenceGenerator} instance The given SequenceGenerator instance.
 * @param {Array} transmitters The given transmitters.
 */
function prepareTransmitters(instance, transmitters) {
  instance.transmitters = [];

  for(var cTransmitter = 0; cTransmitter < transmitters.length; cTransmitter++) {
    var transmitter = {};
    transmitter.identifier = {};
    transmitter.identifier.value = transmitters[cTransmitter]; // Assume string
    transmitter.identifier.type = "Undefined";
    transmitter.isVisible = false;
    transmitter.zoneIndex = getRandomInt(0, instance.zones.length);
    transmitter.receiverIndex = getRandomInt(0,
                      instance.zones[transmitter.zoneIndex].receivers.length);
    transmitter.toggleVisibilityBy = new Date();
    instance.transmitters.push(transmitter);

    var timeoutMilliseconds = getRandomInt(100, 1000); // Spaced out
    setTimeout(updateSequence, timeoutMilliseconds, instance, cTransmitter);
  }
}


/**
 * Update the sequence, emitting an event if necessary.
 * @param {SequenceGenerator} instance The given SequenceGenerator instance.
 * @param {Integer} transmitterIndex The array index of the given transmitter.
 */
function updateSequence(instance, transmitterIndex) {
  var transmitter = instance.transmitters[transmitterIndex];
  var zone = instance.zones[transmitter.zoneIndex];
  var tiraid;

  /* Visibility change */
  if(time.isInPast(transmitter.toggleVisibilityBy)) {
    var toggleMilliseconds;
    transmitter.isVisible = !transmitter.isVisible;

    /* Visible: change zone and receiver */
    if(transmitter.isVisible) {
      toggleMilliseconds = getRandomInt(zone.timing.minVisibleMilliseconds,
                                        zone.timing.maxVisibleMilliseconds);
      transmitter.toggleVisibilityBy = time.getFuture(toggleMilliseconds);
      transmitter.zoneIndex = getRandomInt(0, instance.zones.length);
      zone = instance.zones[transmitter.zoneIndex];
      transmitter.receiverIndex = getRandomInt(0, zone.receivers.length);
      tiraid = { identifier: transmitter.identifier,
                 timestamp: time.getCurrent(),
                 radioDecodings: [ zone.receivers[transmitter.receiverIndex] ] };
      instance.emit('visibilityEvent', tiraid);
    }

    /* Invisible: disappear until visibility timeout */
    else {
      toggleMilliseconds = getRandomInt(zone.timing.minInvisibleMilliseconds,
                                        zone.timing.maxInvisibleMilliseconds);
      transmitter.toggleVisibilityBy = time.getFuture(toggleMilliseconds);
      setTimeout(updateSequence, toggleMilliseconds + 1, instance,
                 transmitterIndex); 
      return;   
    }
  }

  /* (Potential) Displacement */
  else {
    var previousReceiverIndex = transmitter.receiverIndex;
    transmitter.receiverIndex = getRandomInt(0, zone.receivers.length);
    tiraid = { identifier: transmitter.identifier,
               timestamp: time.getCurrent(),
               radioDecodings: [ zone.receivers[transmitter.receiverIndex] ] };
    instance.emit('visibilityEvent', tiraid);
  }

  var timeoutMilliseconds = getRandomInt(DEFAULT_MIN_BLINK_MILLISECONDS,
                                         DEFAULT_MAX_BLINK_MILLISECONDS);
  setTimeout(updateSequence, timeoutMilliseconds, instance, transmitterIndex);
}


/**
 * Return a random integer between the given boundaries.
 * @param {Number} minimum The given minimum Integer.
 * @param {Number} maximum The given maximum Integer (non-inclusive!).
 */
function getRandomInt(minimum, maximum) {
  return Math.floor((Math.random() * (maximum - minimum)) + minimum);
}

module.exports = SequenceGenerator;

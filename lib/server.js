/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var util = require('util');
var events = require('events');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var sequenceGenerator = require('./sequencegenerator');

var HTTP_PORT = 3003;


/**
 * Starling Class
 * Detects events and sends notifications.
 * @param {Object} options The options as a JSON object.
 * @constructor
 */
function Starling(options) {
  var self = this;
  options = options || {};
  self.specifiedHttpPort = options.httpPort || HTTP_PORT;
  self.httpPort = process.env.PORT || self.specifiedHttpPort;
  self.sequences = [];

  self.app = express();
  self.app.use(bodyParser.urlencoded({ extended: false }));
  self.app.use(bodyParser.json());

  self.app.use(function(req, res, next) {
    req.starling = self;
    next();
  });

  self.app.use('/sequences', require('./routes/sequences'));
  self.app.use('/', express.static(__dirname + '/../web'));

  console.log("reelyActive Starling instance is emulating an open IoT");
  events.EventEmitter.call(self);

  self.app.listen(self.httpPort, function() {
    console.log("starling is listening on port", self.httpPort);
  });
};
util.inherits(Starling, events.EventEmitter);


/**
 * Process the given emulation sequence.
 * @param {Object} params The parameters to use.
 * @param {function} callback Function to call on completion.
 */
Starling.prototype.processSequence = function(params, callback) {
  var self = this;
  var sequenceType = params.action;

  switch(sequenceType) {
    case "Emit once":
      processSingleEmission(self, params, callback);
      break;
    case "Run sequence":
      processLocationsSequence(self, params, callback);
      break;
    default:
      console.log("Unsupported sequence type: " + sequenceType);
      callback();
  }
}


/**
 * Process a single emission emulation sequence.
 * @param {Starling} instance The given Starling instance.
 * @param {Object} params The parameters to use.
 * @param {function} callback Function to call on completion.
 */
function processSingleEmission(instance, params, callback) {
  var identifier = { type: "EUI-64",
                     value: params.transmitterID };
  var radioDecodings = [ { rssi: 128,
                           identifier: { type: "EUI-64",
                                         value: params.receiverID } } ];
  var tiraid = createTiraid(identifier, radioDecodings);

  instance.emit('visibilityEvent', tiraid);
  callback();
}


/**
 * Process a locations emulation sequence.
 * @param {Starling} instance The given Starling instance.
 * @param {Object} params The parameters to use.
 * @param {function} callback Function to call on completion.
 */
function processLocationsSequence(instance, params, callback) {
  var sequence = JSON.parse(params.sequence);

  for(var cLocation = 0; cLocation < sequence.locations.length; cLocation++) {
    var generator = new sequenceGenerator(sequence.locations[cLocation]);
    instance.sequences.push(generator);
    generator.on('visibilityEvent', function(tiraid) {
      instance.emit('visibilityEvent', tiraid);
    });
  }
  callback();
}


/**
 * Create a tiraid
 * @param {Object} identifier The transmitting device identifier.
 * @param {Array} radioDecodings The radio decodings of the transmission.
 * @return {Object} The corresponding tiraid.
 */
function createTiraid(identifier, radioDecodings) {
  var tiraid = {};
  tiraid.identifier = identifier;
  tiraid.timestamp = new Date().toISOString();
  tiraid.radioDecodings = radioDecodings;

  return tiraid;
}


module.exports = Starling;

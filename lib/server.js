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
  this.specifiedHttpPort = options.httpPort || HTTP_PORT;
  this.httpPort = process.env.PORT || this.specifiedHttpPort;
  this.sequences = [];

  this.app = express();
  this.app.use('/', express.static(__dirname + '/../web'));
  this.app.use(bodyParser.urlencoded({ extended: false }));

  this.app.post('/sequence', function(req, res) {
    processSequence(self, getRequestParameters(req), function() {
      res.redirect('/');
    });
  });

  console.log("reelyActive Starling instance is emulating an open IoT");
  events.EventEmitter.call(this);

  this.app.listen(this.httpPort, function() {
    console.log("starling is listening on port", self.httpPort);
  });
};
util.inherits(Starling, events.EventEmitter);


/**
 * Return the API request parameters as an object.
 * @param {Object} req The request.
 */
function getRequestParameters(req) {
  var params = {};
  params.queryPath = req.originalUrl;
  params.body = req.body;
  return params;
}


/**
 * Process the given emulation sequence.
 * @param {Starling} instance The given Starling instance.
 * @param {Object} params The parameters to use.
 * @param {function} callback Function to call on completion.
 */
function processSequence(instance, params, callback) {
  var sequenceType = params.body.action;

  switch(sequenceType) {
    case "Emit once":
      processSingleEmission(instance, params, callback);
      break;
    case "Run sequence":
      processLocationsSequence(instance, params, callback);
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
                     value: params.body.transmitterID };
  var radioDecodings = [ { rssi: 128,
                           identifier: { type: "EUI-64",
                                         value: params.body.receiverID } } ];
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
  var sequence = JSON.parse(params.body.sequence);

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

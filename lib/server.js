/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var util = require('util');
var events = require('events');
var http = require('http');
var express = require('express');

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

  this.app = express();
  this.app.use('/', express.static(__dirname + '/../web'));

  console.log("reelyActive Starling instance is emulating an open IoT");
  events.EventEmitter.call(this);

  this.app.listen(this.httpPort, function() {
    console.log("starling is listening on port", self.httpPort);
  });
};
util.inherits(Starling, events.EventEmitter);


module.exports = Starling;

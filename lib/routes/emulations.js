/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */

const express = require('express');
const path = require('path');
const responseHandler = require('./responsehandler');


let router = express.Router();

router.route('/')
  .post(function(req, res) {
    createEmulation(req, res);
  });

router.route('/:id/:type')
  .get(function(req, res) {
    retrieveEmulation(req, res);
  })
  .put(function(req, res) {
    replaceEmulation(req, res);
  })
  .delete(function(req, res) {
    removeEmulation(req, res);
  });


/**
 * Create an emulation.
 * @param {Object} req The HTTP request.
 * @param {Object} res The HTTP result.
 */
function createEmulation(req, res) {
  let emulation = req.body.emulation;
  let rootUrl = req.protocol + '://' + req.get('host');
  let queryPath = req.originalUrl;
  let emulations = req.starling.emulations;
  emulations.create(emulation, function(status, data) {
    let response = responseHandler.prepareResponse(req, status, data);
    res.status(status).json(response);
  });
}


/**
 * Retrieve the given emulation.
 * @param {Object} req The HTTP request.
 * @param {Object} res The HTTP result.
 */
function retrieveEmulation(req, res) {
  if(redirect(req.params.id, '', '', res)) {
    return;
  }

  switch(req.accepts(['json', 'html'])) {
    case 'html':
      res.sendFile(path.resolve(__dirname + '/../../web/starling/emulations/index.html'));
      break;
    default:
      let id = req.params.id;
      let type = req.params.type;
      let rootUrl = req.protocol + '://' + req.get('host');
      let queryPath = req.originalUrl;
      let emulations = req.starling.emulations;
      emulations.retrieve(id, type, function(status, data) {
        let response = responseHandler.prepareResponse(req, status, data);
        res.status(status).json(response);
      });
      break;
  }
}


/**
 * Replace the specified emulation.
 * @param {Object} req The HTTP request.
 * @param {Object} res The HTTP result.
 */
function replaceEmulation(req, res) {
  if(redirect(req.params.id, '', '', res)) {
    return;
  }

  let id = req.params.id;
  let type = req.params.type;
  let emulation = req.body.emulation;
  let rootUrl = req.protocol + '://' + req.get('host');
  let queryPath = req.originalUrl;
  let emulations = req.starling.emulations;
  emulations.replace(id, type, emulation, function(status, data) {
    let response = responseHandler.prepareResponse(req, status, data);
    res.status(status).json(response);
  });
}


/**
 * Remove the specified emulation.
 * @param {Object} req The HTTP request.
 * @param {Object} res The HTTP result.
 */
function removeEmulation(req, res) {
  if(redirect(req.params.id, '', '', res)) {
    return;
  }

  let id = req.params.id;
  let type = req.params.type;
  let rootUrl = req.protocol + '://' + req.get('host');
  let queryPath = req.originalUrl;
  let emulations = req.starling.emulations;
  emulations.remove(id, type, function(status, data) {
    let response = responseHandler.prepareResponse(req, status, data);
    res.status(status).json(response);
  });
}


/**
 * Redirect if required and return the status.
 * @param {String} id The given ID.
 * @param {String} prefix The prefix to the ID in the path.
 * @param {String} suffix The suffix to the ID in the path.
 * @param {Object} res The HTTP result.
 * @return {boolean} Redirection performed?
 */
function redirect(id, prefix, suffix, res) {
  let standardisedId = null;  // TODO: convert to standardised ID

  if(standardisedId && (standardisedId !== id)) {
    res.redirect(prefix + standardisedId + suffix);
    return true;
  }

  return false;
}


module.exports = router;

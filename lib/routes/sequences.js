/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var express = require('express');


var router = express.Router();


router.route('/')
  .post(function(req, res) {
    createSequence(req, res);
  });


/**
 * Create a sequence.
 * @param {Object} req The HTTP request.
 * @param {Object} res The HTTP result.
 */
function createSequence(req, res) {
  var params = req.body;
  req.starling.processSequence(params, function() {
    switch(req.accepts(['json', 'html'])) {
      case 'html':
        res.redirect('/');
        break;
      default:
        var rootUrl = req.protocol + '://' + req.get('host');
        var queryPath = req.originalUrl;
        res.status(status).json(response);
        break;
    }
  });
}


module.exports = router;

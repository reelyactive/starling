/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */


// Constants
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const MESSAGE_BAD_REQUEST = 'Bad Request [400].  An error likely occurred on the server.';
const MESSAGE_NOT_FOUND = 'Emulation for this device Not Found [404].';


// DOM elements
let jsonResponse = document.querySelector('#jsonResponse');
let identifier = document.querySelector('#identifier');
let loading = document.querySelector('#loading');
let error = document.querySelector('#error');
let errorMessage = document.querySelector('#errorMessage');
let emulations = document.querySelector('#emulations');


// Other variables
let emulationsUrl = window.location.href;
let deviceIdSignature;


// Initialisation: GET the emulations and display in DOM
getEmulations(emulationsUrl, function(status, response) {
  jsonResponse.textContent = JSON.stringify(response, null, 2);
  loading.hidden = true;

  if(status === STATUS_OK) {
    deviceIdSignature = Object.keys(response.emulations)[0];
    let deviceEmulations = response.emulations[deviceIdSignature];
    identifier.textContent = deviceIdSignature;
    emulations.hidden = false;
  }
  else if(status === STATUS_BAD_REQUEST) {
    errorMessage.textContent = MESSAGE_BAD_REQUEST;
    error.hidden = false;
  }
  else if(status === STATUS_NOT_FOUND) {
    errorMessage.textContent = MESSAGE_NOT_FOUND;
    error.hidden = false;
  }
});


// GET the emulation
function getEmulations(url, callback) {
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      return callback(httpRequest.status,
                      JSON.parse(httpRequest.responseText));
    }
  };
  httpRequest.open('GET', url);
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send();
}


// PUT the given emulation
function putEmulations(json, callback) {
  let httpRequest = new XMLHttpRequest();
  let jsonString = JSON.stringify(json);

  error.hidden = true;
  httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if((httpRequest.status === STATUS_OK) ||
         (httpRequest.status === STATUS_CREATED)) {
        return callback(httpRequest.status,
                        JSON.parse(httpRequest.responseText));
      }
      else {
        return callback(httpRequest.status);
      }
    }
  };
  httpRequest.open('PUT', emulationsUrl);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send(jsonString);
}


// DELETE the given emulations
function deleteEmulations(callback) {
  let httpRequest = new XMLHttpRequest();

  error.hidden = true;
  httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status === STATUS_OK) {
        return callback(httpRequest.status,
                        JSON.parse(httpRequest.responseText));
      }
      else {
        return callback(httpRequest.status);
      }
    }
  };
  httpRequest.open('DELETE', emulationsUrl);
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send();
}

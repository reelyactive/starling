/**
 * Copyright reelyActive 2023
 * We believe in an open Internet of Things
 */


// Constant definitions
const SIGNATURE_SEPARATOR = '/';


// DOM elements
let contextDisplay = document.querySelector('#contextDisplay');


// Emulate and display the context
let context = starling.getContext('/context');
contextDisplay.textContent = JSON.stringify(context, null, 2);
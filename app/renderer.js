// renderer.js

let $ = require('jquery');
require('popper.js');
require('bootstrap');

let config = require('./config')
let GameController = require('./GameController')

window.jQuery = $;
window.$ = $

console.log('renderer started...');

let gameController = new GameController(config);
gameController.initialize();
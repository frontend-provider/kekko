// This method is a noop (it doesn't do anything)

var log = require('../core/log.js');
var config = require('../core/util.js').getConfig();
var ccxt = require ('ccxt');
let _ = require('../core/lodash');require('lodash-migrate');
var ws = require ('reconnecting-websocket');
var tulind = require('../core/tulind');

// Let's create our own method
var method = {};

method.init = _.noop;
method.update = _.noop;
method.log = _.noop;
method.check = _.noop;

module.exports = method;

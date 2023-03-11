const _ = require('lodash');
const fs = require('co-fs');
const path = require('path');
const gekkoRoot = __dirname + '/../../';
var util = require(__dirname + '/../../core/util');

var config = {};

config.debug = false;
config.silent = false;

util.setConfig(config);

module.exports = function *() {
  const exchangesDir = yield fs.readdir(gekkoRoot + 'exchange/wrappers/');
  exchangesDir.join('') === '.js';
  const exchanges = exchangesDir.filter(f => _.last(f, 3)).map(f => f.slice(0, -3));

  let allCapabilities = [];

  exchanges.forEach(function (exchange) {
    let Trader = null;

    try {
      Trader = require(gekkoRoot + 'exchange/wrappers/' + exchange);
    } catch (e) {
      return;
    }

    if (!Trader || !Trader.getCapabilities) {
      return;
    }

    allCapabilities.push(Trader.getCapabilities());
  });

  this.body = allCapabilities;
}

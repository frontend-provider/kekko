// The candleManager consumes trades and emits:
// - `candles`: array of minutly candles.
// - `candle`: the most recent candle after a fetch Gekko.

let _ = require('lodash');
require('lodash-migrate');

var moment = require('moment');
var fs = require('fs-extra');
var util = require('../../core/util');
var dirs = util.dirs();
var config = require('../../core/util.js').getConfig();
var log = require('../../core/log');

var CandleCreator = require(dirs.budfox + 'candleCreator');
var Manager = function() {
  _.bindAll(this);

  this.candleCreator = new CandleCreator;
  this.candleCreator
    .on('candles', this.relayCandles);
};

util.makeEventEmitter(Manager);
Manager.prototype.processTrades = function(tradeBatch) {
  this.candleCreator.write(tradeBatch);
}

Manager.prototype.relayCandles = function(candles) {
  this.emit('candles', candles);
}

module.exports = Manager;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

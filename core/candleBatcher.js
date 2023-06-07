/*


*/
var _ = require('lodash');
var util = require('./util');

var CandleBatcher = function(candleSize) {
  if(!_.isNumber(candleSize))
    throw new Error('candleSize is not a number');
  
  this.candleSize = candleSize;
  this.smallCandles = [];
  this.calculatedCandles = [];
  _.bindAll(this);
}

util.makeEventEmitter(CandleBatcher);

CandleBatcher.prototype.write = function(candles) {
  if(!_.isArray(candles)) {
    throw new Error('candles is not an array');
  }

  this.emitted = 0;
  _.each(candles, function(candle) {
    this.smallCandles.push(candle);
    this.check();
  }, this);

  return this.emitted;
}

CandleBatcher.prototype.check = function() {
  if(_.size(this.smallCandles) % this.candleSize !== 0)
    return;
  this.emitted++;
  this.calculatedCandles.push(this.calculate());
  this.smallCandles = [];
}

CandleBatcher.prototype.flush = function() {
  _.each(
    this.calculatedCandles,
    candle => this.emit('candle', candle)
  );

  this.calculatedCandles = [];
}

CandleBatcher.prototype.calculate = function() {
  // remove the id property of the small candle
  var { id, ...first } = this.smallCandles.shift();

  first.vwp = first.vwp * first.volume;

  var candle = _.reduce(
    this.smallCandles,
    function(candle, m) {
      candle.high = _.max([candle.high, m.high]);
      candle.low = _.min([candle.low, m.low]);
      candle.close = m.close;
      candle.volume += m.volume;
      candle.vwp += m.vwp * m.volume;
      candle.trades += m.trades;
      return candle;
    },
    first
  );

  if(candle.volume)
    candle.vwp /= candle.volume;
  else
    candle.vwp = candle.open;

  candle.start = first.start;
  return candle;
}
module.exports = CandleBatcher;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

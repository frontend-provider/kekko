// required indicators
let _ = require('../../core/lodash');
var EMA = require('./EMA.js');

var Indicator = function(config) {
  this.input = 'price';
  this.arrTema = [];
  this.result = false;
  this.trend = false;
  this.ema = new EMA(config.weight);
  this.ema2 = new EMA(config.weight);
  this.ema3 = new EMA(config.weight);
}

// add a price and calculate the EMAs and
// the result
Indicator.prototype.update = function (price) {
  this.ema.update(price);
  this.ema2.update(this.ema.result);
  this.ema3.update(this.ema2.result);
  this.result = 3 * this.ema.result - 3 * this.ema2.result + this.ema3.result;

  //save trend history
  this.arrTema.push(this.result);
  if (this.arrTema.length > 2) {
    this.arrTema.shift();
  }

  if (this.arrTema.length == 2) {
    // store percentage change of last two TMAs
    this.trend = (this.arrTema[1] / this.arrTema[0]) * 100;

  }
}

module.exports = Indicator;

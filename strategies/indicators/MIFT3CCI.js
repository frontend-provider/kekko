// Inverse Fisher Transformation on CCI (using EMA smoothening)

// required indicators
let _ = require('../../core/lodash');
var CCI = require('./CCI.js');
var EMA = require('./EMA.js');

var Indicator = function(config) {
  this.result = false;
  this.cciLength = config.cciLength;
  this.emaLength = config.emaLength;
  this.cci = new CCI({ history: this.cciLength, constant: 0.015 });
  this.ema1 = new EMA(this.emaLength);
  this.ema2 = new EMA(this.emaLength);
  this.ema3 = new EMA(this.emaLength);
}
 
Indicator.prototype.update = function (candle) {
  this.cci.update(candle);

  //check for sufficient history
  if (this.cci.result) {
    let v1 = 0.1 * (this.cci.result / 4);
    this.ema1.update(v1);
    this.ema2.update(this.ema1.result);
    this.ema3.update(this.ema2.result); 
    this.result = (Math.exp(2 * this.ema3.result)-1) / (Math.exp(2 * this.ema3.result)+1);
    
  }
}

module.exports = Indicator;


// Inverse Fisher Transformation on CCI (using WMA smoothening)

// required indicators
let _ = require('../../core/lodash');
var CCI = require('./CCI.js');
var WMA = require('./WMA.js');

var Indicator = function(config) {
  this.result = false;
  this.cciLength = config.cciLength;
  this.wmaLength = config.wmaLength;
  this.cci = new CCI({ history: this.cciLength, constant: 0.015 });
  this.wma = new WMA(this.wmaLength);
}
 
Indicator.prototype.update = function (candle) {
  this.cci.update(candle);

  //check for sufficient history
  if (this.cci.result) {
    let v1 = 0.1 * (this.cci.result / 4);
    this.wma.update(v1);

    if (this.wma.result) { 
        this.result = (Math.exp(2 * this.wma.result)-1) / (Math.exp(2 * this.wma.result)+1);
    }
  }
}

module.exports = Indicator;


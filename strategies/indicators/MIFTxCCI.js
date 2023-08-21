// Inverse Fisher Transformation crossing on CCI (using EMA smoothening)

// required indicators
let _ = require('../../core/lodash');
let util = require('../../core/util');
let config = util.getConfig();
let log = require('../../core/log.js');

var CCI = require('./CCI.js');
var EMA = require('./EMA.js');

var Indicator = function(config) {
  this.arrMC = [];

  this.resultFast = false;
  this.resultSlow = false;
  this.cciLength = config.cciLength;
  this.emaFast = config.emaFast;
  this.emaSlow = config.emaSlow;
  this.cci = new CCI({ history: this.cciLength, constant: 0.015 });
  this.emaFast1 = new EMA(this.emaFast);
  this.emaFast2 = new EMA(this.emaFast);
  this.emaFast3 = new EMA(this.emaFast);

  this.emaSlow1 = new EMA(this.emaSlow);
  this.emaSlow2 = new EMA(this.emaSlow)
}

Indicator.prototype.update = function (candle) {
  this.cci.update(candle);

  //check for sufficient history
  if (this.cci.result) {
    let v1 = 0.1 * (this.cci.result / 4);
    this.emaFast1.update(v1);
    this.emaFast2.update(this.emaFast1.result);
    this.emaFast3.update(this.emaFast2.result);
    this.resultFast = (Math.exp(2 * this.emaFast3.result)-1) / (Math.exp(2 * this.emaFast3.result)+1);

    this.emaSlow1.update(v1);
    this.emaSlow2.update(this.emaSlow1.result);
    this.resultSlow = (Math.exp(2 * this.emaSlow2.result)-1) / (Math.exp(2 * this.emaSlow2.result)+1);

    let arrM = [];
    arrM.push(this.resultSlow);
    arrM.push(this.resultFast);

    //save trend history
    this.arrMC.push(arrM);
    if (this.arrMC.length > 2) {
      this.arrMC.shift();
    }
  }
}


Indicator.prototype.buyCross = function() {
    if (this.arrMC.length == 2 && this.arrMC[0][0] < this.arrMC[0][1] && this.arrMC[1][0] > this.arrMC[1][1] && this.arrMC[1][0] > -0.6 && this.arrMC[1][0] < 0.0) {
        return true;
    } else {
        return false;
    }
}


Indicator.prototype.sellCross = function() {
    if (this.arrMC.length == 2 && this.arrMC[0][0] > this.arrMC[0][1] && this.arrMC[1][0] < this.arrMC[1][1]) {
        return true;
    } else {
        return false;
    }
}

module.exports = Indicator;

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
}
 
Indicator.prototype.update = function (candle) {
  this.cci.update(candle);
  //check for sufficient history
  if (this.cci.result) {
    let v1 = 0.1 * (this.cci.result / 4);
    this.ema1.update(v1);
    this.ema2.update(this.ema1.result);
    this.result = (Math.exp(2 * this.ema2.result)-1) / (Math.exp(2 * this.ema2.result)+1);
    
  }
}

module.exports = Indicator;

/* Test @ Tradingview
// when red line > blue line, red crossing blue from below, BUY
// when red line < blue line, red crossing blue from above, SELL

study("miftCCI-red", shorttitle="miftCCI-red") 
ccilength=input(7, "CCI Length") 
wmalength=input(8, title="Smoothing length") 
v1=0.1*(cci(close, ccilength)/4) 
v2=ema(ema(v1, wmalength), wmalength) 
INV=(exp(2*v2)-1)/(exp(2*v2)+1) 
plot(INV, color=red, linewidth=1) 
hline(0.5, color=red) 
hline(-0.5, color=green)


study("miftCCI-blue", shorttitle="miftCCI-blue") 
ccilength=input(7, "CCI Length") 
emalength=input(6, title="Smoothing length") 
v1=0.1*(cci(close, ccilength)/4) 
v2=ema(ema(ema(v1, emalength), emalength),emalength) 
INV=(exp(2*v2)-1)/(exp(2*v2)+1) 
plot(INV, color=blue, linewidth=1) 
hline(0.5, color=red) 
hline(-0.5, color=green)
*/

/*
  Export data to .csv

	(CC-BY-SA 4.0) Rowan Griffin
	https://creativecommons.org/licenses/by-sa/4.0/

*/

var log = require('../core/log.js');
var config = require('../core/util.js').getConfig();
let _ = require('../core/lodash');
let fs = require('fs-extra');

var method = {

  /* INIT */
  init: function() {
    // core
    this.name = 'CSV Export';
    this.requiredHistory = 0;
    this.startTime = new Date();
    this.debug = true;
  },


  //called on each new candle, before check.
  update: function(candle) {
    fs.appendFile('Data Exports/' + this.settings.Asset + ':' + this.settings.Currency + ' ' + this.startTime + '.csv', candle.high + "," + candle.low + "," + candle.close + "," + candle.volume + "," + candle.trades + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
    });

  },

  /* CHECK */
  check: function() {}, // check()


  /* END backtest */
  end: function() {

  }

};

module.exports = method;

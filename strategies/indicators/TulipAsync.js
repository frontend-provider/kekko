// ****************************************************************************
// *** TulipSync.js                                                         ***
// ****************************************************************************
// * Purpose: Use a Tulip indicator inside a strategy like any other native
// * gekko indicator - in a synchronous way, by excuting tulip functionality
// * with await/promise.
// * This approach also exposes Tulip functionality to multi timeframe
// * strategies, with custom candle size batching, where asyncIndicatorRunner 
// * is not available 
// ****************************************************************************


const tulind = require('tulind');
const util = require('../../core/util');
const dirs = util.dirs();
const log = require(dirs.core + 'log');
let _ = require('../../core/lodash');

var Indicator = function(config) {
    this.config = config;
    this.tulipInput = [];
    this.candleProps = {
        open: [],
        high: [],
        low: [],
        close: [],
        volume: [],
        vwp: []
    };

    if (config.indicator === undefined)
        throw Error('TulipSync: You must specify an indicator, e.g. sma or macd');
    else
        this.indName = config.indicator;

    if (config.candleinput === undefined)
        throw Error('TulipSync: You must specify a candle input type, e.g. "close" or "high,close"');
    else {
        var arrCI = config.candleinput.split(',');
        for (i=0; i < arrCI.length; i++) {
            this.tulipInput.push(this.candleProps[arrCI[i]]);
        }
    }

    this.indLength = config.length;
    this.age = 0;
    //log.debug('*** Usage info for Tulip indicator', this.indName, ':\n', tulind.indicators[this.indName]);
}


Indicator.prototype.addCandle = function (candle) {
    this.age++;
    if (this.lastAddedCandle !== undefined) this.updateCandle(this.lastAddedCandle);
    this.lastAddedCandle = candle;
    this.candleProps.open.push(candle.open);
    this.candleProps.high.push(candle.high);
    this.candleProps.low.push(candle.low);
    this.candleProps.close.push(candle.close);
    this.candleProps.volume.push(candle.volume);
    this.candleProps.vwp.push(candle.vwp);

    if(this.age > this.indLength) {
        this.candleProps.open.shift();
        this.candleProps.high.shift();
        this.candleProps.low.shift();
        this.candleProps.close.shift();
        this.candleProps.volume.shift();
        this.candleProps.vwp.shift();
    }
}


Indicator.prototype.updateCandle = function (candle) {
    this.candleProps.close[this.candleProps.close.length - 1] = candle.close;
}


Indicator.prototype.update = function (candle) {
    this.addCandle(candle) ;  

    return new Promise((resolve, reject) => {
        //e.g. this.indName = 'sma'
        tulind.indicators[this.indName].indicator(this.tulipInput, this.config.options, function(err, tulipResults) {
            if (err) {
                reject(err);
            }
            else {
                var arrResult = [];
                for (let i=0; i<tulipResults.length; i++) {
                   arrResult.push(tulipResults[i][tulipResults[i].length-1]);
                }
                resolve(arrResult);
            }
        });
    });
}


Indicator.prototype.repaint = function (candle) {
    this.updateCandle(candle);

    return new Promise((resolve, reject) => {
        //e.g. this.indName = 'sma'
        tulind.indicators[this.indName].indicator(this.tulipInput, this.config.options, function(err, tulipResults) {
            if (err) {
                reject(err);
            }
            else {
                var arrResult = [];
                for (let i=0; i<tulipResults.length; i++) {
                   arrResult.push(tulipResults[i][tulipResults[i].length-1]);
                }
                resolve(arrResult);
            }
        });
    });
}


module.exports = Indicator;

/*

*/
var convnetjs = require('../core/convnet.js');
//https://cs.stanford.edu/people/karpathy/convnetjs/started.html
var math = require('mathjs');
var log = require('../core/log.js');
var config = require('../core/util.js').getConfig();
var coretulind = require('../core/tulind.js');
var _ = require('lodash');
var ws = require ('reconnecting-websocket');
var tulind = require('tulind');

console.log("Tulip Indicators version is:");
console.log(tulind.version);

var strat = {
  priceBuffer : [],
  predictionCount : 0,
  batchsize : 10,
  num_neurons : 19,
  layer_activation : 'sigmoid',
  scale : 5,
  prevAction : 'wait',
  prevPrice : 0,
  stoplossCounter : 0,
  hodle_threshold : 1,

  init : function() {
    //indicators
    maFast=this.addTulipIndicator('maFast', 'sma', { optInTimePeriod: this.settings.SMA_long});
    maSlow=this.addTulipIndicator('maSlow', 'sma', { optInTimePeriod: this.settings.SMA_short});
    var SMMA = require('./indicators/SMMA.js');
    this.name = 'Neural Network';
    this.requiredHistory = config.tradingAdvisor.historySize;
    this.SMMA = new SMMA(5);
    var layers = [
      {type:'input', out_sx: 7, out_sy:8, out_depth: 4},
      {type:'conv', num_neurons: 19, activation: this.layer_activation},
      {type:'svm', num_classes:1},
      {type:'regression', num_neurons: 1}
    ];

    this.nn = new convnetjs.Net();
    this.nn.makeLayers(layers);
    if(this.settings.method == 'sgd')
    {
      this.trainer = new convnetjs.SGDTrainer(this.nn, {
        learning_rate: this.settings.learning_rate,
        momentum: this.settings.momentum,
        batch_size: this.batchsize,
        l2_decay: this.settings.decay,
        l1_decay: this.settings.decay
      });
    }
    else if(this.settings.method == 'nesterov')
    {
      this.trainer = new convnetjs.SGDTrainer(this.nn, {
        method: this.settings.method,
        learning_rate: this.settings.learning_rate,
        momentum: this.settings.momentum,
        batch_size: this.batchsize,
        l2_decay: this.settings.decay,
        l1_decay: this.settings.decay
      });
    }
    else
    {
      this.trainer = new convnetjs.Trainer(this.nn, {
        method: this.settings.method,
        batch_size: this.batchsize,
        eps: 1e-6,
        ro: 0.95,
        l2_decay: this.settings.decay,
        l1_decay: this.settings.decay
      });
    }

    this.addIndicator('stoploss', 'StopLoss', {
      threshold : this.settings.stoploss_threshold
    });
    this.hodle_threshold = this.settings.hodle_threshold || 1;
  },
  learn : function () {
    for (let i = 0; i < this.priceBuffer.length - 1; i++) {
      let data = [this.priceBuffer[i]];
      let current_price = [this.priceBuffer[i + 1]];
      let vol = new convnetjs.Vol(data);
      this.trainer.train(vol, current_price);
      this.predictionCount++;
    }
  },
  setNormalizeFactor : function(candle) {
    this.scale = Math.pow(10,Math.trunc(candle.high).toString().length+2);
    log.debug('Set normalization factor to',this.scale);
  },
  update : function(candle)
  {
    this.SMMA.update( (candle.high + candle.close + candle.low + candle.vwp) /4);
    var smmaFast= this.SMMA.result;
    if (1 === this.scale && 1 < candle.high && 0 === this.predictionCount) this.setNormalizeFactor(candle);
    this.priceBuffer.push(smmaFast / this.scale );
    if (2 > this.priceBuffer.length) return;
     for (i=0;i<3;++i)
      this.learn();
    while (this.settings.price_buffer_len < this.priceBuffer.length) this.priceBuffer.shift();
  },
  onTrade: function(event) {
    if ('buy' === event.action) {
      this.indicators.stoploss.long(event.price);
    }
    this.prevAction = event.action;
    this.prevPrice = event.price;
  },
  predictCandle : function() {
    let vol = new convnetjs.Vol(this.priceBuffer);
    let prediction = this.nn.forward(vol);
    return prediction.w[0];
  },
  check : function(candle) {
    if(this.predictionCount > this.settings.min_predictions)
    {
      if (
          'buy' === this.prevAction
          && this.settings.stoploss_enabled
          && 'stoploss' === this.indicators.stoploss.action
      ) {
        this.stoplossCounter++;
        log.debug('>>>>>>>>>> STOPLOSS triggered <<<<<<<<<<');
        this.advice('short');
      }
      let prediction = this.predictCandle() * this.scale;
      let currentPrice = candle.close;
      let meanp = math.mean(prediction, currentPrice);
      let meanAlpha = (meanp - currentPrice) / currentPrice * 100;
      let signalSell = candle.close > this.prevPrice || candle.close < (this.prevPrice*this.hodle_threshold);
      let signal = meanp < currentPrice;
      if ('buy' !== this.prevAction && signal === false  && meanAlpha> this.settings.threshold_buy )
      {
        log.debug("Buy - Predicted variation: ",meanAlpha);
        return this.advice('long');
      }
      else if
      ('sell' !== this.prevAction && signal === true && meanAlpha < this.settings.threshold_sell && signalSell)
      {
        log.debug("Sell - Predicted variation: ",meanAlpha);
        return this.advice('short');
      }
    }
  },
  end : function() {
    log.debug('Triggered stoploss',this.stoplossCounter,'times');
  }
};
module.exports = strat;

//https://cs.stanford.edu/people/karpathy/convnetjs/started.html
let convnetjs = require('../core/convnet.js');
let DQNAgent = require('../core/rl.js');
let deepqlearn = require('convnet/build/deepqlearn');
const tulind = require('../core/tulind');

let math = require('mathjs');
var log = require('../core/log.js');
let config = require('../method-nn.js');
let _ = require('../core/lodash');
var ws = require ('reconnecting-websocket');
var NN = require('./indicators/NN.js');
var method = {
  priceBuffer : [],
  predictionCount : 0,
  batchsize : 8,
  layer_neurons : 20,
  layer_activation : 'relu',
  scale : 1,
  prevAction : 'wait',
  prevPrice : 0,
  stoplossCounter : 0,
  hodl_threshold : 1,

  // init the strategy
  init : function() {

    this.name = 'NN';
    this.requiredHistory = 60;
    this.addTulipIndicator('demaFast', 'dema', {optInTimePeriod: this.settings.DEMA});
    var layers = [
      {type:'input', out_sx: 7, out_sy:8, out_depth: 4},
      {type:'svm', num_classes:20},
      {type:'conv', num_neurons: 10000,group_size: 2,activation:'sigmoid'},
      {type:'svm', num_classes:20},
      {type:'regression', num_neurons: 20}
    ];
    var layers2 = [
      {type:'input', out_sx: 7, out_sy:8, out_depth: 4},
      {type:'svm', num_classes:20},
      {type:'fc', num_neurons: 10000,group_size: 2,activation:'relu'},
      {type:'svm', num_classes:20},
      {type:'regression', num_neurons: 20}
    ];
    var layers3 = [
      {type:'input', out_sx: 7, out_sy:8, out_depth: 4},
      {type:'svm', num_classes:20},
      {type:'conv', num_neurons: 10000,group_size: 2,activation:'sigmoid'},
      {type:'svm', num_classes:20},
      {type:'regression', num_neurons: 20}
    ];

    this.nn = new convnetjs.Net();
    this.nn.makeLayers(layers,layers2,layers3);
    this.trainer = new convnetjs.SGDTrainer(this.nn, {
      learning_rate: this.settings.learning_rate,
      momentum: this.settings.momentum,
      batch_size: this.batchsize,
      l2_decay: this.settings.decay
    });

    this.hodl_threshold = this.settings.hodl_threshold || 1;
  },

  learn: function() {
    for (let i = 0; i < this.priceBuffer.length - 4; i++) {
      let data = this.priceBuffer[i];
      let current_price = this.priceBuffer[i + 1];
      let vol = new convnetjs.Vol(data);
      this.trainer.train(vol, current_price);
      let predicted_values = this.nn.forward(vol);
      let accuracymatch = predicted_values.w[0] === current_price.first;
      this.nn.backward(accuracymatch);
      this.predictionCount++;
    }
  },


  setNormalizeFactor : function(candle) {
    this.scale = Math.pow(10,Math.trunc(candle.high).toString().length+2);
    log.debug('Set normalization factor to',this.scale);
  },

  update : function(candle)
  {
    let demaFast = this.tulipIndicators.demaFast.result.result;

    if (1 === this.scale && 1 < candle.high && 0 === this.predictionCount) this.setNormalizeFactor(candle);

    this.priceBuffer.push(demaFast / this.scale );
    if (2 > this.priceBuffer.length) return;
    for (tweakme=0;tweakme<5;++tweakme)
    this.learn();

    while (this.settings.price_buffer_len < this.priceBuffer.length) this.priceBuffer.shift();
  },

  onTrade: function(event) {
    if ('buy' === event.action)
    {this.indicators.stoploss.long(event.price);}
    this.prevAction = event.action;this.prevPrice = event.price;
  },

  predictCandle : function() {
    let vol = new convnetjs.Vol(this.priceBuffer);
    let prediction = this.nn.forward(vol);
    return prediction.w[0];
  },

  check : function(candle) {
    if(this.predictionCount > this.settings.min_predictions)
    {
    if ('buy' === this.prevAction && this.settings.stoploss_enabled && 'stoploss' === this.indicators.stoploss.action)
      {
        this.stoplossCounter++;
        log.debug('>>>>>>>>>> STOPLOSS triggered <<<<<<<<<<');
        //this.advice('short');
      }
      let prediction = this.predictCandle() * this.scale;
      let currentPrice = candle.close;
      let meanp = math.mean(prediction, currentPrice);
      let meanAlpha = (meanp - currentPrice) / currentPrice * 100;
      let signalSell = candle.close > this.prevPrice || candle.close < (this.prevPrice*this.hodl_threshold);
      let signal = meanp < currentPrice;
      if ('buy' !== this.prevAction && signal === false  && meanAlpha> this.settings.threshold_buy )
      {
        log.debug('|NN|NO-BUY|',meanAlpha);
      }

      else if
      ('sell' !== this.prevAction && signal === true && meanAlpha < this.settings.threshold_sell && signalSell)
      {
        log.debug('|NN|NO-SELL|',meanAlpha);
      }

    }
  },

  end : function() {
    log.debug('Triggered stoploss',this.stoplossCounter,'times');
  }

};

module.exports = method;

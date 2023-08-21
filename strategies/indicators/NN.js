//https://cs.stanford.edu/people/karpathy/convnetjs/
var DEMA = require('./DEMA.js');
let convnetjs = require('../../core/convnet.js');
let DQNAgent = require('../../core/rl.js');
let deepqlearn = require('convnet/build/deepqlearn');
var math = require('mathjs');

var log = require('../../core/log.js');

var Indicator = function(settings) {
  this.input = 'candle'
  this.result = false;
  this.lastPrice = 0;
  this.settings = settings;

  this.priceBuffer = [];
  this.predictionCount = 0;
  this.batchsize = 8;
  this.layer_neurons = 20;
  this.layer_activation = 'adadelta';
  this.scale = 1;
  this.prevAction = 'wait';
  this.prevPrice = 0;
  this.stoplossCounter = 0;

  this.DEMA = new DEMA(5);

    let layers = [
      {type:'input', out_sx:7, out_sy:8, out_depth: 4},
      {type:'fc', num_neurons: this.layer_neurons, activation: this.layer_activation},
      {type:'regression', num_neurons: 1}
    ];

    this.nn = new convnetjs.Net();

    this.nn.makeLayers( layers );

    if(settings.method == 'sgd')
    {
      this.trainer = new convnetjs.SGDTrainer(this.nn, {
        learning_rate: settings.learning_rate,
        momentum: settings.momentum,
        batch_size: this.batchsize,
        l2_decay: settings.decay
      });
    }
    else if(settings.method == 'adadelta')
    {
      this.trainer = new convnetjs.Trainer(this.nn, {
        method: settings.method,
        learning_rate: settings.learning_rate,
        momentum: settings.momentum,
        batch_size: this.batchsize,
        l2_decay: settings.decay
      });
    }
    else
    {
      this.trainer = new convnetjs.Trainer(this.nn, {
        method: settings.method,
        batch_size: this.batchsize,
        eps: 1e-6,
        ro: 0.95,
        l2_decay: settings.decay
      });
    }
}

Indicator.prototype.setNormalizeFactor = function(candle) {
  this.scale = Math.pow(10,Math.trunc(candle.high).toString().length+2);
  log.debug('Set normalization factor to',this.scale);
}

Indicator.prototype.learn = function () {
  for (let i = 0; i < this.priceBuffer.length - 1; i++) {
    let data = [this.priceBuffer[i]];
    let current_price = [this.priceBuffer[i + 1]];
    let vol = new convnetjs.Vol(data);
    this.trainer.train(vol, current_price);
    this.predictionCount++;
  }
}

Indicator.prototype.onTrade = function(event){
  this.prevAction = event.action;
  this.prevPrice = event.price;
}

Indicator.prototype.predictCandle = function() {
  let vol = new convnetjs.Vol(this.priceBuffer);
  let prediction = this.nn.forward(vol);
  return prediction.w[0];
}

Indicator.prototype.update = function(candle) {
  this.DEMA.update( (candle.high + candle.close + candle.low + candle.vwp) /4);
  let demaFast = this.DEMA.result;

  if (1 === this.scale && 1 < candle.high && 0 === this.predictionCount) this.setNormalizeFactor(candle);

  this.priceBuffer.push(smmaFast / this.scale );
  if (2 > this.priceBuffer.length) return;

   for (i=0;i<3;++i)
    this.learn();

  while (this.settings.price_buffer_len < this.priceBuffer.length) this.priceBuffer.shift();
}

Indicator.prototype.check = function(candle){

  if(this.predictionCount > this.settings.min_predictions)
  {
    let prediction = this.predictCandle() * this.scale;
    let currentPrice = candle.close;
    let meanp = math.mean(prediction, currentPrice);
    let meanAlpha = (meanp - currentPrice) / currentPrice * 100;

    let signalSell = candle.close > this.prevPrice;

    let signal = meanp < currentPrice;
    if ('buy' !== this.prevAction && signal === false  && meanAlpha> this.settings.threshold_buy )
    {
      log.debug("Buy - Predicted variation: ",meanAlpha);
      return 'long';
    }
    else if
    ('sell' !== this.prevAction && signal === true && meanAlpha < this.settings.threshold_sell && signalSell)
    {
      log.debug("Sell - Predicted variation: ",meanAlpha);
      return 'short';
    }
  }
}



module.exports = Indicator;

let _ = require('lodash');require('lodash-migrate');
let fs = require('fs-extra');

const util = require('../../core/util');
var config = util.getConfig();

const dirs = util.dirs();
const moment = require('moment');
const log = require('../../core/log');
const CandleBatcher = require('../../core/candleBatcher');
const isLeecher = config.market && config.market.type === 'leech';
const Actor = function(done){ _.bindAll(this);
  this.done = done;
  this.batcher = new CandleBatcher(config.tradingAdvisor.candleSize);
  this.strategyName = config.tradingAdvisor.method;
  this.setupStrategy();

  var mode = util.gekkoMode();

  if(mode === 'realtime' && !isLeecher)
{
    var Stitcher = require('../../core/tools/dataStitcher');
    var stitcher = new Stitcher(this.batcher);
    stitcher.prepareHistoricalData(done);
} else done();

}

Actor.prototype.setupStrategy = function() {
  if(!fs.existsSync(dirs.methods + this.strategyName + '.js'))
    util.die('Gekko can\'t find the strategy "' + this.strategyName + '"');

  log.info('\t', 'Using the strategy: ' + this.strategyName);

  const strategy = require(dirs.methods + this.strategyName);
  const WrappedStrategy = require('./baseTradingMethod');
  _.each(strategy, function(fn, name) {WrappedStrategy.prototype[name] = fn;});

  let stratSettings;
  if(config[this.strategyName]) {stratSettings = config[this.strategyName];}

  this.strategy = new WrappedStrategy(stratSettings);
  this.strategy
    .on(
      'stratWarmupCompleted',
      e => this.deferredEmit('stratWarmupCompleted', e)
    )
    .on('advice', this.relayAdvice)
    .on(
      'stratUpdate',
      e => this.deferredEmit('stratUpdate', e)
    ).on('stratNotification',
      e => this.deferredEmit('stratNotification', e)
    )

  this.strategy
    .on('tradeCompleted', this.processTradeCompleted);

  this.batcher
    .on('candle', _candle => {
      const { id, ...candle } = _candle;
      this.deferredEmit('stratCandle', candle);
      this.emitStratCandle(candle);
    });
}

Actor.prototype.processCandle = function(candle, done) {
  this.candle = candle;
  const completedBatch = this.batcher.write([candle]);
  if(completedBatch) {
    this.next = done;
  } else {
    done();
    this.next = false;
  }
  this.batcher.flush();
}

// propogate a custom sized candle to the trading strategy
Actor.prototype.emitStratCandle = function(candle) {
  const next = this.next || _.noop;
  this.strategy.tick(candle, next);
}

Actor.prototype.processTradeCompleted = function(trade) {
  this.strategy.processTrade(trade);
}

Actor.prototype.finish = function(done) {
  this.strategy.finish(done);
}

// EMITTERS
Actor.prototype.relayAdvice = function(advice) {
  advice.date = this.candle.start.clone().add(1, 'minute');
  this.deferredEmit('advice', advice);
}

module.exports = Actor;

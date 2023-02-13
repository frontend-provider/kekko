var batchSize = 1000;
var _ = require('lodash');
var fs = require('fs');
var moment = require('moment');
var util = require('../../core/util');
var config = util.getConfig();
var dirs = util.dirs();
var log = require(dirs.core + '/log');

var adapter = config[config.adapter];
var Reader = require(dirs.gekko + adapter.path + '/reader');
var daterange = config.daterange;

var CandleBatcher = require(dirs.core + 'candleBatcher');

var to = moment.utc(daterange.to).startOf('minute');
var from = moment.utc(daterange.from).startOf('minute');
var toUnix = to.unix();

if(to <= from)
  util.die('This daterange does not make sense.')

if(!from.isValid())
  util.die('invalid `from`');

if(!to.isValid())
  util.die('invalid `to`');

let iterator = {
  from: from.clone(),
  to: from.clone().add(batchSize, 'm').subtract(1, 's')
}

var DONE = false;

var result = [];
var reader = new Reader();
var batcher;
var next;
var doneFn = () => {
  process.nextTick(() => {
    next(result);
  })
};

module.exports = function(candleSize, _next) {
  next = _.once(_next);

  batcher = new CandleBatcher(candleSize)
    .on('candle', handleBatchedCandles);

  getBatch();
}

const getBatch = () => {
  reader.get(
    iterator.from.unix(),
    iterator.to.unix(),
    'full',
    handleCandles
  )
}

const shiftIterator = () => {
  iterator = {
    from: iterator.from.clone().add(batchSize, 'm'),
    to: iterator.from.clone().add(batchSize * 2, 'm').subtract(1, 's')
  }
}

const handleCandles = (err, data) => {
  if(err) {
    console.error(err);
    util.die('Encountered an error..')
  }

  if(_.size(data) && _.last(data).start >= toUnix || iterator.from.unix() >= toUnix)
    DONE = true;

  batcher.write(data);
  batcher.flush();

  if(DONE) {
    reader.close();

    setTimeout(doneFn, 100);

  } else {
    shiftIterator();
    getBatch();
  }
}

const handleBatchedCandles = candle => {
  result.push(candle);
}

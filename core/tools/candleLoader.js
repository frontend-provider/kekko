const _ = require('../lodash');

var batchSize = 10000;
let fs = require('fs-extra');
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
  to: from.clone().add(batchSize, 's').subtract(1, 's')
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
    from: iterator.from.clone().add(batchSize, 's'),
    to: iterator.from.clone().add(batchSize * 2, 's').subtract(1, 's')
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

/*

The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

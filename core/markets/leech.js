const _ = require('lodash');
var moment = require('moment');
var util = require('../util');
var dirs = util.dirs();
var config = util.getConfig();
var exchangeChecker = require(dirs.gekko + 'exchange/exchangeChecker');
var adapter = config[config.adapter];
var Reader = require(dirs.gekko + adapter.path + '/reader');
var TICKINTERVAL = 20 * 1000; // 20 seconds
var slug = config.watch.exchange.toLowerCase();
var exchange = exchangeChecker.getExchangeCapabilities(slug);

if(!exchange)
  util.die(`Unsupported exchange: ${slug}`)

const error = exchangeChecker.cantMonitor(config.watch);
if(error)
  util.die(error, true);

if(config.market.from)
  var fromTs = moment.utc(config.market.from).unix();
else
  var fromTs = moment().startOf('minute').unix();


var Market = function() {

  _.bindAll(this);

  Readable.call(this, {objectMode: true});

  this.reader = new Reader();
  this.latestTs = fromTs;

  setInterval(
    this.get,
    TICKINTERVAL
  );
}

var Readable = require('stream').Readable;
Market.prototype = Object.create(Readable.prototype, {
  constructor: { value: Market }
});

Market.prototype._read = _.once(function() {
  this.get();
});

Market.prototype.get = function() {
  var future = moment().add(1, 'minute').unix();

  this.reader.get(
    this.latestTs,
    future,
    'full',
    this.processCandles
  )
}

Market.prototype.processCandles = function(err, candles) {
  var amount = _.size(candles);
  if(amount === 0) {
    // no new candles!
    return;
  }

  _.each(candles, function(c, i) {
    c.start = moment.unix(c.start).utc();
    this.push(c);
  }, this);

  this.latestTs = _.last(candles).start.unix() + 1;
}

module.exports = Market;

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

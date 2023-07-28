let _ = require('lodash');
require('lodash-migrate');
var moment = require('moment');
var util = require('../../core/util.js');
var config = require('../../core/util.js').getConfig();
var log = require('../../core/log');

var TradeBatcher = function(tid) {
  if(!_.isString(tid))
    throw new Error('tid is not a string');

  _.bindAll(this);
  this.tid = tid;
  this.last = -1;
}

util.makeEventEmitter(TradeBatcher);

TradeBatcher.prototype.write = function(batch) {

  if(!_.isArray(batch))
    throw new Error('batch is not an array');

  if(_.isEmpty(batch))
    return log.debug('Trade fetch came back empty.');

  var filterBatch = this.filter(batch);

  var amount = _.size(filterBatch);
  if(!amount)
    return log.debug('No new trades.');

  var momentBatch = this.convertDates(filterBatch);

  var last = _.last(momentBatch);
  var first = _.first(momentBatch);

  log.debug(
    'Processing', amount, 'new trades.',
    'From',
    first.date.format('YYYY-MM-DD HH:mm:ss'),
    'UTC to',
    last.date.format('YYYY-MM-DD HH:mm:ss'),
    'UTC.',
    '(' + first.date.from(last.date, true) + ')'
  );

  this.emit('new batch', {
    amount: amount,
    start: first.date,
    end: last.date,
    last: last,
    first: first,
    data: momentBatch
  });

  this.last = last[this.tid];

// we overwrote those, get unix ts back
  if(this.tid === 'date')
    this.last = this.last.unix();

}

TradeBatcher.prototype.filter = function(batch) {
  // make sure we're not trying to count
  // beyond infinity
  var lastTid = _.last(batch)[this.tid];
  if(lastTid === lastTid + 1)
    util.die('trade tid is max int, Gekko can\'t process..');

// remove trades that have zero amount
// read more: https://github.com/askmike/gekko/issues/486
  batch = _.filter(batch, function(trade) {
    return trade.amount > 0;
  });
  return _.filter(batch, function(trade) {
    return this.last < trade[this.tid];
  }, this);
}

TradeBatcher.prototype.convertDates = function(batch) {
  return _.map(_.cloneDeep(batch), function(trade) {
    trade.date = moment.unix(trade.date).utc();
    return trade;
  });
}

module.exports = TradeBatcher;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/





const util = require('../../core/util.js');
const _ = require('lodash');
const moment = require('moment');
const log = require('../../core/log');
const retry = require('../../exchange/exchangeUtils').retry;

const config = util.getConfig();

const dirs = util.dirs();

const Fetcher = require(dirs.exchanges + 'poloniex');

const batchSize = 60 * 2; // 2 hour
const overlapSize = 10; // 10 minutes

// Helper methods
function joinCurrencies(currencyA, currencyB){
    return currencyA + '_' + currencyB;
}

// patch getTrades..
Fetcher.prototype.getTrades = function(range, callback) {
  const handle = (err, result) => {
    if(err) {
      return callback(err);
    }

    if(_.size(result) === 50000) {
      // to many trades..
      util.die('too many trades..');
    }

    result = _.map(result, function(trade) {
      return {
        tid: trade.tradeID,
        amount: +trade.amount,
        date: moment.utc(trade.date).format('X'),
        price: +trade.rate
      };
    });

    callback(result.reverse());
  };

  const params = {
    currencyPair: joinCurrencies(this.currency, this.asset)
  }

  params.start = range.from.unix();
  params.end = range.to.unix();

  const fetch = next => this.poloniex._public('returnTradeHistory', params, this.processResponse(next));
  retry(null, fetch, handle);
}

util.makeEventEmitter(Fetcher);

var iterator = false;
var end = false;
var done = false;

var fetcher = new Fetcher(config.watch);

var fetch = () => {
  log.info(
    config.watch.currency,
    config.watch.asset,
    'Requesting data from',
    iterator.from.format('YYYY-MM-DD HH:mm:ss') + ',',
    'to',
    iterator.to.format('YYYY-MM-DD HH:mm:ss')
  );

  if(util.gekkoEnv === 'child-process') {
    let msg = ['Requesting data from',
      iterator.from.format('YYYY-MM-DD HH:mm:ss') + ',',
      'to',
      iterator.to.format('YYYY-MM-DD HH:mm:ss')].join('');
    process.send({type: 'log', log: msg});
  }
  fetcher.getTrades(iterator, handleFetch);
}

var handleFetch = trades => {
  iterator.from.add(batchSize, 'minutes').subtract(overlapSize, 'minutes');
  iterator.to.add(batchSize, 'minutes').subtract(overlapSize, 'minutes');

  if(!_.size(trades)) {
    // fix https://github.com/askmike/gekko/issues/952
    if(iterator.to.clone().add(batchSize * 4, 'minutes') > end) {
      fetcher.emit('done');
    }

    return fetcher.emit('trades', []);
  }

  var last = moment.unix(_.last(trades).date);

  if(last > end) {
    fetcher.emit('done');

    var endUnix = end.unix();
    trades = _.filter(
      trades,
      t => t.date <= endUnix
    );
  }

  fetcher.emit('trades', trades);
}

module.exports = function (daterange) {
  iterator = {
    from: daterange.from.clone(),
    to: daterange.from.clone().add(batchSize, 'minutes')
  }
  end = daterange.to.clone();

  return {
    bus: fetcher,
    fetch: fetch
  }
}

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


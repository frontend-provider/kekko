var _ = require('lodash');
var moment = require('moment');

var util = require('../../core/util.js');
var log = require('../../core/log');

var config = util.getConfig();

var dirs = util.dirs();

var Fetcher = require(dirs.exchanges + 'kraken');

util.makeEventEmitter(Fetcher);

var end = false;
var done = false;
var from = false;

var lastId = false;
var prevLastId = false;

var fetcher = new Fetcher(config.watch);

var fetch = () => {
    fetcher.import = true;

    if (lastId) {
        var tidAsTimestamp = lastId / 1000000;
        setTimeout(() => {
            fetcher.getTrades(tidAsTimestamp, handleFetch)
        }, 500);
    }
    else
        fetcher.getTrades(from, handleFetch);
}

var handleFetch = (err, trades) => {
    if(!err && !trades.length) {
        console.log('no trades');
        err = 'No trades';
    }

    if (err) {
        log.error(`There was an error importing from Kraken ${err}`);
        fetcher.emit('done');
        return fetcher.emit('trades', []);
    }

    var last = moment.unix(_.last(trades).date).utc();
    lastId = _.last(trades).tid
    if(last < from) {
        log.debug('Skipping data, they are before from date', last.format());
        return fetch();
    }

    if  (last > end || lastId === prevLastId) {
        fetcher.emit('done');

        var endUnix = end.unix();
        trades = _.filter(
            trades,
            t => t.date <= endUnix
        )
    }

    prevLastId = lastId
    fetcher.emit('trades', trades);
}

module.exports = function (daterange) {

    from = daterange.from.clone();
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

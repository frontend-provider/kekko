var BATCH_SIZE = 60; // minutes
var MISSING_CANDLES_ALLOWED = 3; // minutes, per batch
var _ = require('../lodash');
var moment = require('moment');
var async = require('async');
var util = require('../util');
var config = util.getConfig();
var dirs = util.dirs();
var log = require(dirs.core + 'log');
var adapter = config[config.adapter];
var Reader = require(dirs.gekko + adapter.path + '/reader');
var reader = new Reader();

// todo: rewrite with generators or async/await..
var scan = function(done) {
  log.info('Scanning local history for backtestable dateranges.');

  reader.tableExists('candles', (err, exists) => {

    if(err)
      return done(err, null, reader);

    if(!exists)
      return done(null, [], reader);

    async.parallel({
      boundry: reader.getBoundry,
      available: reader.countTotal
    }, (err, res) => {

      var first = res.boundry.first;
      var last = res.boundry.last;

      var optimal = (last - first) / 60;

      log.debug('Available', res.available);
      log.debug('Optimal', optimal);

      // There is a candle for every minute
      if(res.available === optimal + 1) {
        log.info('Gekko is able to fully use the local history.');
        return done(false, [{
          from: first,
          to: last
        }], reader);
      }

      // figure out where the gaps are..

      var missing = optimal - res.available + 1;

      log.info(`The database has ${missing} candles missing, Figuring out which ones...`);

      var iterator = {
        from: last - (BATCH_SIZE * 60),
        to: last
      }

      var batches = [];
      // loop through all candles we have
      // in batches and track whether they
      // are complete
      async.whilst(
          () => {
            return iterator.from > first
          },
          next => {
            var from = iterator.from;
            var to = iterator.to;
            reader.count(
              from,
              iterator.to,
              (err, count) => {
                var complete = count + MISSING_CANDLES_ALLOWED > BATCH_SIZE;

                if(complete)
                  batches.push({
                    to: to,
                    from: from
                  });

                next();
              }
            );

            iterator.from -= BATCH_SIZE * 60;
            iterator.to -= BATCH_SIZE * 60;
          },
          () => {
            if(batches.length === 0) {
              return done(null, [], reader);
            }

            // batches is now a list like
            // [ {from: unix, to: unix } ]

            var ranges = [ batches.shift() ];

            _.each(batches, batch => {
              var curRange = _.last(ranges);
              if(batch.to === curRange.from)
                curRange.from = batch.from;
              else
                ranges.push( batch );
            })

            // we have been counting chronologically reversed
            // (backwards, from now into the past), flip definitions
            ranges = ranges.reverse();

            _.map(ranges, r => {
              return {
                from: r.to,
                to: r.from
              }
            });


            // ranges is now a list like
            // [ {from: unix, to: unix } ]
            //
            // it contains all valid dataranges available for the
            // end user.

            return done(false, ranges, reader);
          }
        )
    });

  });
}

module.exports = scan;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

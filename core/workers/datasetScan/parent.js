const _ = require('../../lodash');

var moment = require('moment');
var async = require('async');
var os = require('os');
var util = require('../../util');
var dirs = util.dirs();
var dateRangeScan = require('../dateRangeScan/parent');

module.exports = function(config, done) {

  util.setConfig(config);
  var adapter = config['sqlite'];
  var scan = require(dirs.gekko + adapter.path + '/scanner');
  scan((err, markets) => {
    if(err)
    return done(err);
    let numCPUCores = os.cpus().length;
    if(numCPUCores === undefined)
    numCPUCores = 1;
    async.eachLimit(markets, numCPUCores, (market, next) => {
      let marketConfig = _.clone(config);
      marketConfig.watch = market;
      dateRangeScan(marketConfig, (err, ranges) => {
        if(err)
        return next();
        market.ranges = ranges;
        next();
      });

    },
    err => {
      let resp = {
        datasets: [],
        errors: []
      }
      markets.forEach(market => {
        if(market.ranges)
        resp.datasets.push(market);
        else
        resp.errors.push(market);
      })
      done(err, resp);})
  });
}

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

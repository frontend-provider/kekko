/*



*/
const axios = require('axios');
const _ = require('lodash');
var util = require('../../core/util');
var log = require(dirs.core + 'log');
var config = util.getConfig();

const CandleUploader = function(done) {
  _.bindAll(this);

  done();
  this.candles = [];
  this.schedule();
};

CandleUploader.prototype.processCandle = function(candle, done) {
  this.candles.push(candle);
  done();
};

CandleUploader.prototype.schedule = function() {
  this.timer = setTimeout(this.upload, 10 * 1000);
}

CandleUploader.prototype.rawUpload = function(candles, count, next) {

  const amount = candles.length;

  axios({
    url: config.candleUploader.url,
    method: 'post',
    data: {
      apiKey: config.candleUploader.apiKey,
      watch: config.watch,
      candles: candles
    }
  })
    .then(r => {
      if(r.data.success === false) {
        console.log('error uploading:', r.data);
      }
      console.log(new Date, 'uploaded', amount, 'candles');

      next();
    })
    .catch(e => {
      console.log('error uploading:', e.message);

      count++;

      if(count > 10) {
        console.log('FINAL error uploading:', e.message);
        return next();
      }

      setTimeout(() => this.rawUpload(candles, count, next), 2000);
    });
}

CandleUploader.prototype.upload = function() {
  const amount = this.candles.length;
  if(!amount) {
    return this.schedule();
  }

  this.rawUpload(this.candles, 0, () => {
    this.schedule();
  });

  this.candles = [];
}

CandleUploader.prototype.finish = function(next) {
  this.upload();
  clearTimeout(this.timer);
}

module.exports = CandleUploader;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

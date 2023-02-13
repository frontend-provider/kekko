/*


*/
var log = require('../core/log');
var moment = require('moment');
var _ = require('lodash');
var Server = require('../web/server.js');

var Actor = function(next) {
  _.bindAll(this);

  this.server = new Server();
  this.server.setup(next);
}

Actor.prototype.init = function(data) {
  this.server.broadcastHistory(data);
};

Actor.prototype.processCandle = function(candle, next) {
  this.server.broadcastCandle(candle);

  next();
};

Actor.prototype.processAdvice = function(advice) {
  this.server.broadcastAdvice(advice);
};

module.exports = Actor;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

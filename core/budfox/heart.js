// The heart schedules and emit ticks every 20 seconds.



let _ = require('lodash');
require('lodash-migrate');
var util = require('../util');
var log = require('../log');

var moment = require('moment');

if (util.getConfig().watch.tickrate)
  var TICKRATE = util.getConfig().watch.tickrate;
else if(util.getConfig().watch.exchange != 'exmo')
  var TICKRATE = 2;
else
  var TICKRATE = 20;

var Heart = function() {
  this.lastTick = false;
  _.bindAll(this);
}

util.makeEventEmitter(Heart);

Heart.prototype.pump = function() {
  log.debug('scheduling ticks');
  this.scheduleTicks();
}

Heart.prototype.tick = function() {
  if(this.lastTick) {
    // make sure the last tick happened not to lang ago
    // @link https://github.com/askmike/gekko/issues/514
    if(this.lastTick < moment().unix() - TICKRATE * 3)
      util.die('Failed to tick in time, see https://github.com/askmike/gekko/issues/514 for details', true);
  }

  this.lastTick = moment().unix();
  this.emit('tick');
}

Heart.prototype.scheduleTicks = function() {
  setInterval(
    this.tick,
    +moment.duration(TICKRATE, 's')
  );

  // start!
  _.defer(this.tick);
}

module.exports = Heart;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

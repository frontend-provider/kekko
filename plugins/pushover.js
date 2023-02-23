/*


*/

var push = require( 'pushover-notifications' );
//https://www.npmjs.com/package/pushover-notifications
var _ = require('lodash');
var log = require('../core/log.js');
var util = require('../core/util.js');
var config = util.getConfig();
var pushoverConfig = config.pushover;

var Pushover = function() {
  _.bindAll(this);

  this.p;
  this.price = 'N/A';

  this.setup();
}

Pushover.prototype.setup = function() {
  var setupPushover = function() {
    this.p = new push( {
        user: pushoverConfig.user,
        token: pushoverConfig.key,
    });

    if(pushoverConfig.sendPushoverOnStart) {
      this.send(
        "Gekko has started",
        [
          "I've just started watching ",
          config.watch.exchange,
          ' ',
          config.watch.currency,
          '/',
          config.watch.asset,
          ". I'll let you know when I got some advice"
        ].join('')
      );
    } else
    log.debug('Setup pushover adviser.');
  }
    setupPushover.call(this);
}

Pushover.prototype.send = function(subject, content) {
  var msg = {
      // These values correspond to the parameters detailed on https://pushover.net/api
      // 'message' is required. All other values are optional.
      message: content,
      title: pushoverConfig.tag + subject,
      device: 'devicename',
      priority: 1
  };

  this.p.send( msg, function( err, result ) {
      if ( err ) {
          throw err;
      }

      console.log( result );
  });

}

Pushover.prototype.processCandle = function(candle, callback) {
  this.price = candle.close;
  callback();
}

Pushover.prototype.processAdvice = function(advice) {
  if (advice.recommendation == 'soft' && pushoverConfig.muteSoft) return;
  var text = [
    advice.recommendation,
    this.price
  ].join(' ');
  var subject = text;
  this.send(subject, text);
}

Pushover.prototype.checkResults = function(err) {
  if(err)
    log.warn('error sending pushover', err);
  else
    log.info('Send advice via pushover.');
}

module.exports = Pushover;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

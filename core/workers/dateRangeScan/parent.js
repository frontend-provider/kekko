var _ = require('../../lodash-core');
var util = require('../../util');
var config = util.getConfig();
var dirs = util.dirs();

var ForkTask = require('relieve').tasks.ForkTask;
const fork = require('child_process').fork;//*

module.exports = function(config, done) {
  var debug = typeof v8debug === 'object';
  if (debug) {
    process.execArgv = [];
  }

  task = new ForkTask(fork('./child'));
  task.send('start', config);
  task.once('ranges', ranges => {
    return done(false, ranges);
  });
  task.on('exit', code => {
    if(code !== 0)
      done('ERROR, unable to scan dateranges, please check the console.');
  });
}
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

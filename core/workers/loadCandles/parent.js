var _ = require('../../lodash-core');
var util = require('../../util');
var config = util.getConfig();
var dirs = util.dirs();

const fork = require('child_process').fork;

module.exports = (config, callback) => {
  var debug = typeof v8debug === 'object';
  if (debug) {
    process.execArgv = [];
  }

  const child = fork(__dirname + '/child');
  const message = {
    what: 'start',
    config
  }

  const done = _.once(callback);

  child.on('message', function(m) {
    if(m === 'ready')
      return child.send(message);

    // else we are done and have candles!
    done(null, m);
    if (this.connected) {
      this.disconnect();
    }
  });

  child.on('exit', code => {
    if(code !== 0)
      done('ERROR, unable to load candles, please check the console.');
  });
}

/*
let config = {
watch: {
  exchange: 'exmo',
  currency: 'BTC',
  asset: 'LTC'
},

daterange: {
  from: '2023-01-22 11:22',
  to: '2023-02-03 19:56'
},

adapter: 'sqlite',
sqlite: {
  path: 'plugins/sqlite',dataDirectory: 'history',
  version: 0.1,
  dependencies: [{module: 'sqlite3',version: '5.1.4'}]
},
candleSize: 10
}

module.exports(config, function(err, data) {
console.log('FINAL CALLBACK');
console.log('err', err);
console.log('data', data.length);
})
*/

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

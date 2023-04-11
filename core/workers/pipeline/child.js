var _ = require('../../lodash-core');
var util = require('../../util');
var config = util.getConfig();
var dirs = util.dirs();

var start = (mode, config) => {
  // force correct gekko env
  util.setGekkoEnv('child-process');
  // force correct gekko mode & config
  util.setGekkoMode(mode);
  util.setConfig(config);

  var pipeline = require(dirs.core + 'pipeline');
  pipeline({
    config: config,
    mode: mode
  });
}

process.send('ready');

process.on('message', function(m) {
  if(m.what === 'start')
    start(m.mode, m.config);

  if(m.what === 'exit')
    process.exit(0);
});

process.on('disconnect', function() {
  console.log('disconnect');
  process.exit(-1);
})

process
  .on('unhandledRejection', (message, p) => {
    console.error('unhandledRejection', message);
    process.send({type: 'error', message: message});
  })
  .on('uncaughtException', err => {
    console.error('uncaughtException', err);
    process.send({type: 'error', error: err});
    process.exit(1);
  });

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

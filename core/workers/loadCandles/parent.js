


const fork = require('child_process').fork;
var _ = require('lodash');

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

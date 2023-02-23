/*


*/
const _ = require('lodash');
const cache = require('../state/cache');
const Logger = require('../state/logger');
const apiKeyManager= cache.get('apiKeyManager');
const gekkoManager = cache.get('gekkos');
const base = require('./baseConfig');

// starts an import
// requires a post body with a config object
module.exports = function *() {
  const mode = this.request.body.mode;

  let config = {};

  _.merge(config, base, this.request.body);

  // Attach API keys
  if(config.trader && config.trader.enabled && !config.trader.key) {

    const keys = apiKeyManager._getApiKeyPair(config.watch.exchange);

    if(!keys) {
      this.body = 'No API keys found for this exchange.';
      return;
    }

    _.merge(
      config.trader,
      keys
    );
  }

  const state = gekkoManager.add({config, mode});

  this.body = state;
}

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*


*/

const _ = require('lodash');
const fs = require('co-fs');
const gekkoRoot = __dirname + '/../../';

module.exports = function *() {
  const strategyDir = yield fs.readdir(gekkoRoot + 'strategies');
  const strats = strategyDir
    .filter(f => _.last(f, 3).join('') === '.js')
    .map(f => {
      return { name: f.slice(0, -3) }
    });

  // for every strat, check if there is a config file and add it
  const stratConfigPath = gekkoRoot + 'config/strategies';
  const strategyParamsDir = yield fs.readdir(stratConfigPath);

  for(let i = 0; i < strats.length; i++) {
    let strat = strats[i];
    if(strategyParamsDir.indexOf(strat.name + '.toml') !== -1)
      strat.params = yield fs.readFile(stratConfigPath + '/' + strat.name + '.toml', 'utf8')
    else
      strat.params = '';
  }

  this.body = strats;
}

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var plugins = [
  {
    name: 'Candle writer',
    description: 'Store candles in a database',
    slug: 'candleWriter',
    async: true,
    modes: ['importer'],
    path: config => 'sqlite' + '/writer',
    version: 0.1,
  },
  {
    name: 'Trading Advisor',
    description: 'Calculate trading advice',
    slug: 'tradingAdvisor',
    async: true,
    modes: ['backtest'],
    emits: true,
    path: config => 'tradingAdvisor/tradingAdvisor.js',
  },

  {
    name: 'Paper Trader',
    description: 'Paper trader that simulates fake trades.',
    slug: 'paperTrader',
    async: false,
    modes: ['backtest'],
    emits: true,
    path: config => 'paperTrader/paperTrader.js',
  },
  {
    name: 'Performance Analyzer',
    description: 'Analyzes performances of trades',
    slug: 'performanceAnalyzer',
    async: false,
    modes: ['backtest'],
    emits: true,
    path: config => 'performanceAnalyzer/performanceAnalyzer.js',
  },

  {
    name: 'Event logger',
    description: 'Logs all gekko events.',
    slug: 'eventLogger',
    async: false,
    modes: ['backtest'],
    greedy: true
  },
  {
    name: 'Backtest result export',
    description: 'Exports the results of a gekko backtest',
    slug: 'backtestResultExporter',
    async: false,
    modes: ['backtest']
  },

];

module.exports = plugins;

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

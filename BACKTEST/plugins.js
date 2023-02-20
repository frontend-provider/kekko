var plugins = [
  {
    name: 'Candle writer',
    description: 'Store candles in a database',
    slug: 'candleWriter',
    async: true,
    modes: ['importer'],
    path: config => config.adapter + '/writer',
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

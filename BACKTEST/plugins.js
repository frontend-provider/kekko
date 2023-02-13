var plugins = [
  {
    name: 'Candle writer',
    description: 'Store candles in a database',
    slug: 'candleWriter',
    async: true,
    modes: ['realtime', 'importer'],
    path: config => config.adapter + '/writer',
    version: 0.1,
  },
  {
    name: 'Trading Advisor',
    description: 'Calculate trading advice',
    slug: 'tradingAdvisor',
    async: true,
    modes: ['realtime', 'backtest'],
    emits: true,
    path: config => 'tradingAdvisor/tradingAdvisor.js',
  },

  {
    name: 'Pushover',
    description: 'Sends pushover.',
    slug: 'pushover',
    async: false,
    modes: ['realtime'],
    dependencies: [{
      module: 'pushover-notifications',
      version: '0.2.3'
    }]
  },

  {
    name: 'Advice logger',
    description: '',
    slug: 'adviceLogger',
    async: false,
    silent: true,
    modes: ['realtime']
  },
  {
    name: 'Trader',
    description: 'Follows the advice and create real orders.',
    slug: 'trader',
    async: true,
    modes: ['realtime'],
    emits: true,
    path: config => 'trader/trader.js',
  },
  {
    name: 'Paper Trader',
    description: 'Paper trader that simulates fake trades.',
    slug: 'paperTrader',
    async: false,
    modes: ['realtime', 'backtest'],
    emits: true,
    path: config => 'paperTrader/paperTrader.js',
  },
  {
    name: 'Performance Analyzer',
    description: 'Analyzes performances of trades',
    slug: 'performanceAnalyzer',
    async: false,
    modes: ['realtime', 'backtest'],
    emits: true,
    path: config => 'performanceAnalyzer/performanceAnalyzer.js',
  },

  {
    name: 'Candle Uploader',
    description: 'Upload candles to an extneral server',
    slug: 'candleUploader',
    async: true,
    modes: ['realtime']
  },

  {
    name: 'Event logger',
    description: 'Logs all gekko events.',
    slug: 'eventLogger',
    async: false,
    modes: ['realtime', 'backtest'],
    greedy: true
  },
  {
    name: 'Backtest result export',
    description: 'Exports the results of a gekko backtest',
    slug: 'backtestResultExporter',
    async: false,
    modes: ['backtest']
  },
  {
    name: 'Child to parent',
    description: 'Relays events from the child to the parent process',
    slug: 'childToParent',
    async: false,
    modes: ['realtime'],
    greedy: true
  },
  {
    name: 'Candle Uploader',
    description: 'Upload realtime market candles to an external server',
    slug: 'candleUploader',
    async: true,
    modes: ['realtime'],
    dependencies: [{
      module: 'axios',
      version: '0.18.0'
    }]
  },
  {
    name: 'Blotter',
    description: 'Writes all buy/sell trades to a blotter CSV file',
    slug: 'blotter',
    async: false,
    modes: ['realtime'],
  },
];

module.exports = plugins;

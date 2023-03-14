const path = require('path');
var UIconfig = require('../vue/statics/UiConfig');
var config = {};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                          GENERAL SETTINGS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.silent = false;
config.debug = true;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING TRADING ADVICE
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.tradingAdvisor = {};

config.candleWriter = {enabled: true};

config.backtestResultExporter = {
  enabled: true,
  writeToDisk: false,
  data: {
    stratUpdates: true,
    roundtrips: true,
    stratCandles: true,
    trades: true
  }
};

config.childToParent = {enabled: false,};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING ADAPTER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// configurable in the UIconfig
config.adapter = UIconfig.adapter;
config.sqlite = {
  path: 'plugins/sqlite',
  version: 0.1,
  dataDirectory: 'history',
  journalMode: require('../isWindows.js') ? 'PERSIST' : 'WAL',
  dependencies: [{module: 'sqlite3',version: '5.1.4'}]
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING BACKTESTING
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.backtest = {daterange: 'scan',batchSize: 50};
module.exports = config;

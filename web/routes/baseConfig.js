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
config.tradingAdvisor = {}
config.candleWriter = {enabled: true}

config.backtestResultExporter = {
enabled: true,
writeToDisk: false,
data: {stratUpdates: true,roundtrips: true,stratCandles: true,trades: true}
}

config.childToParent = {enabled: true}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING ADAPTER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.adapter = UIconfig.adapter;

config.sqlite = {
path: 'plugins/sqlite',version: 0.1,dataDirectory: 'history',
dependencies: [{module: 'sqlite3'}]
}

config.adviceWriter = {enabled: false,muteSoft: true}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING BACKTESTING
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.backtest = {daterange: 'scan',batchSize: 50}
config.importer = {daterange: {from: "2020-03-08 00:00:00"}}

module.exports = config;

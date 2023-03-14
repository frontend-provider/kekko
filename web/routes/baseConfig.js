var UIconfig = require('../vue/statics/UiConfig');
var config = {};
//General Settings
config.debug =true;
//Watching
config.watch = {};
//Trading Advisor
config.tradingAdvisor = {};
//Adapter
config.adapter='sqlite';
//Trader
config.trader ={};
config.candleWriter={};
config.adviceLogger={};
config.adviceWriter={};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING BACKTESTING
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.backtestResultExporter = {};
config.data={};
config.importer = {};
config.backtest = {};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PAPERTRADER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.paperTrader = {};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PERFORMANCE ANALYZER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.performanceAnalyzer = {};
//Importer
config.sqlite = {};
//Child to Parent
config.childToParent = {};
module.exports = config;

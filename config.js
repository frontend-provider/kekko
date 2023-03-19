/*

*/
var config = {};
//General Settings
config.debug =true;
//Watching 
config.watch = {exchange: 'exchange_simulator',currency: 'LTC',asset: 'BTC'};

//Trading Advisor
config.tradingAdvisor = {enabled:true};
config.tradingAdvisor.candleSize=10;
config.tradingAdvisor.historySize=1;

//Strategy
config.tradingAdvisor.method= 'Strategy';
//Adapter
config.adapter='sqlite';
//Trader
config.trader ={enabled:false,exchange:'',currency:'',asset:'',key:'',secret:''};
config.candleWriter={enabled:false,adapter:'sqlite'};
config.adviceLogger={enabled:true};
config.adviceWriter={enabled:true};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING BACKTESTING
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

config.importer = {
  daterange: 'scan',daterange:{from:'2020-03-08 00:00:00',to:'2023-03-08 00:00:00'}
};

config.backtest = {
  daterange: 'scan',daterange:{from:'2020-03-08 00:00:00',to:'2023-03-08 00:00:00'},
  batchSize: 50
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PAPERTRADER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.paperTrader = {
  enabled: true,
  // report the profit in the currency or the asset?
  reportInCurrency: true,
  // start balance, on what the current balance is compared with
  simulationBalance: {
    // these are in the unit types configured in the watcher.
    asset: 1,
    currency: 100,
  },
  // how much fee in % does each trade cost?
  feeMaker: 0.15,
  feeTaker: 0.25,
  feeUsing: 'maker',
  // how much slippage/spread should Gekko assume per trade?
  slippage: 0.05,
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PERFORMANCE ANALYZER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.performanceAnalyzer = {enabled: true,riskFreeReturn: 5};
//Importer
config.sqlite = {path: 'plugins/sqlite',dataDirectory: 'history',version: 0.1,journalMode: require('./web/isWindows.js') ? 'DELETE' : 'WAL',dependencies:[{module: 'sqlite3'}] };
//Child to Parent
config.childToParent = {enabled: true};
config['I understand that Gekko only automates MY OWN trading strategies']=true;
module.exports = config;


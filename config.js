*/

*/

var config = {};
//General Settings
config.debug =true;
//Watching 
config.watch = {exchange: '',currency: '',asset: ''};

//Trading Advisor
config.tradingAdvisor = {enabled:true};
config.tradingAdvisor.candleSize=10;
config.tradingAdvisor.historySize=1;

//Strategy
config.tradingAdvisor.method= '';
//Adapter
config.adapter='sqlite';
//Trader
config.trader ={enabled:false,exchange:'',currency:'',asset:'',key:'',secret:''};

config.candleWriter={enabled:true,adapter:'sqlite'};
config.adviceLogger={enabled:true};
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

config.data: {
     candleProps: ["close", "start"],
     indicatorResults: true,
     report: true,
     roundtrips: true
};

config.importer = {daterange: 'scan',
  daterange: {from: "2018-03-01",to: "2018-04-28"},
};

config.backtest = {daterange: 'scan',
  daterange: {from: "2018-03-01",to: "2018-04-28"},
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


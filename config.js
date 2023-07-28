/*


*/
var config = {};
//General Settings
config.debug =true;
//Watching
config.watch = {exchange: 'exchange_simulator',currency: 'LTC',asset: 'BTC',tickrate:5};
//Trading Advisor
config.tradingAdvisor = {enabled:true,candleSize:15,historySize:1};

//Strategy
config.tradingAdvisor.method= 'Noop';

//Adapter
config.adapter='sqlite';
config.sqlite = {
  adapter:'sqlite',path: 'plugins/sqlite',version: 0.1,
  dataDirectory: 'history',dependencies: [{module: 'sqlite3'}]
};

config.candleWriter={enabled:true,adapter:'sqlite'};
config.adviceLogger={enabled:true};
config.backtestResultExporter={enabled:false};

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
  trades: true}
};

config.backtest = {daterange: 'scan',batchSize: 50};
config.daterange= {from: "2020-03-01 00:00:00",to: "2023-07-03 00:00:00"};
config.importer = {daterange: {from: "2020-03-01 00:00:00",to:"2023-07-03 00:00:00"}};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING TRADER
// Disable Trader if PAPERTRADER Enabled
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.trader ={enabled:false,
exchange:'exchange_simulator',
currency:'',asset:'',
key:'',secret:'',username:''
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PAPERTRADER
// Disable PaperTrader if TRADER Enabled
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.paperTrader = {enabled: true,
reportInCurrency: true,
feeMaker: 0.15,
feeTaker: 0.25,
feeUsing: 'maker',
slippage: 0.05
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PERFORMANCE ANALYZER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.performanceAnalyzer = {enabled: true,riskFreeReturn: 5};
//Child to Parent
config.childToParent = {enabled: false};
config['I understand that Gekko only automates MY OWN trading strategies']=true;
module.exports = config;

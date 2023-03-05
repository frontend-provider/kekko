/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Disclaimer:
                              USE AT YOUR OWN RISK!
The author of this project is NOT responsible for any damage or loss caused
by this software. There can be bugs and the bot may not perform as expected
or specified. Please consider testing it first with paper trading and/or
backtesting on historical data. Also look at the code to see what how
it is working.
*/

var config = {};
//General Settings
config.debug =true;
//Watching a Market [BTC-LTC]
config.watch = {exchange: 'bitfinex',currency: 'BTC',asset: 'LTC'};
config.watch = {exchange: 'kraken',currency:'XBT',asset:'LTC'};
config.watch = {exchange: 'poloniex',currency:'BTC',asset:'LTC'};
config.watch = {exchange: 'exmo',currency:'BTC',asset:'LTC'};

//Trading Advisor
config.tradingAdvisor = {enabled:true};
config.tradingAdvisor.candleSize=10;
config.tradingAdvisor.historySize=1;
config.tradingAdvisor.method= 'INVERTER';

//Adapter
config.adapter='sqlite';
//Api
config.trader ={enabled:false,exchange:'bitfinex',currency:'BTC',asset:'LTC',key:'',secret:''};
config.trader={enabled:false,exchange:'kraken',currency:'XBT',asset:'LTC',key:'',secret:''};
config.trader={enabled:false,exchange:'poloniex',currency:'BTC',asset:'LTC',key:'',secret:''};
config.trader={enabled:false,exchange:'exmo',currency:'BTC',asset:'LTC',key:'',secret:''};

config.candleWriter={enabled:true,adapter:'sqlite'};

config.adviceLogger={enabled:true};
config.backtestResultExporter={enabled:false};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING BACKTESTING
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Note that these settings are only used in backtesting mode, see here:
// For backtesting you should enable and configure the following plugins:
//trading advisor (to run your strategy).
//paper trader (to execute simulated trades).
//performance analyzer (to calculate how succesfull the strategy would have been).
//Besides that, make sure to configure config.watch.

config.backtest = {
  daterange: 'scan',
  // daterange: {
  //   from: "2018-03-01",
  //   to: "2018-04-28"
  //},
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
config.importer={enabled:true};
config.sqlite = {path: 'plugins/sqlite',dataDirectory: 'history',version: 0.1,journalMode: require('./web/isWindows.js') ? 'DELETE' : 'WAL',dependencies:[{module: 'sqlite3'}] };
//Child to Parent
config.childToParent = {enabled: true};
//Strategy
config.method='INVERTER';

config.INVERTER= {
SMA_long:10,SMA_short:55,DEMA_short:10,DEMA_long:21,RSI:14,
BULL_RSI:7,BULL_RSI_high:82,BULL_RSI_low:60,
BEAR_RSI:14,BEAR_RSI_high:60,BEAR_RSI_low:15,
BULL_MOD_high:5,BULL_MOD_low:-5,BEAR_MOD_high:15,BEAR_MOD_low:-5,
ADX:14,ADX_high:70,ADX_low:50,
Stop_Loss_Percent:3,Stop_Gain_Percent:3,Min_Loss_Percent:1.5,Min_Gain_Percent:1.5,
PINGPONG_GAINS_PERCENTAGE:10};

config['I understand that Gekko only automates MY OWN trading strategies']=false;
module.exports = config;

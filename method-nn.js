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

config.watch = {exchange: '',currency:'BTC',asset:'LTC',key:'',secret:'',ticker:20};
//Trading Advisor
config.tradingAdvisor = {enabled:true,candleSize:1,historySize:60};
config.tradingAdvisor.method= 'NN';

/*
|NN|NO-SELL|

|NN|NO-BUY|
*/

config.NN= {
DEMA:5,
threshold_buy:1.0,
interval:3,
threshold_sell:-1.0,
//https://cs.stanford.edu/people/karpathy/convnetjs/demo/trainers.html
method:'sgd',
learning_rate:0.01,
momentum:0.1,
l1_decay:0.001,
decay:0.001,
stoploss_enabled:false,
stoploss_threshold:0.85,
hodl_threshold:1,
price_buffer_len:100,
min_predictions:9
};

//Adapter
config.adapter='sqlite';

//Trader
config.trader={enabled:false,
exchange:'',currency:'BTC',asset:'LTC',key:'',secret:''};

config.candleWriter={enabled:false,
  adapter:'sqlite'};

config.adviceLogger={enabled:false};
config.backtestResultExporter={enabled:false};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING BACKTESTING
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.backtest = {enabled:false,
  daterange: 'scan',
  daterange: {from: "2020-03-01 00:00:00",to: "2023-04-28 00:00:00"},
  batchSize: 60
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PAPERTRADER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.paperTrader = {enabled: false,
  reportInCurrency: true,
  simulationBalance: {
  asset: 1,
  currency: 100,
  },
  feeMaker: 0.15,
  feeTaker: 0.25,
  feeUsing: 'maker',
  slippage: 0.05,
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PERFORMANCE ANALYZER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
config.performanceAnalyzer = {enabled: false,
  riskFreeReturn: 5};

//Importer
config.importer={enabled:false};
config.sqlite = {path: 'plugins/sqlite',dataDirectory: 'history',version: 0.1,dependencies:[{module: 'sqlite3'}] };

//Child to Parent
config.childToParent = {enabled: true};
config['I understand that Gekko only automates MY OWN trading strategies']=true;
module.exports = config;

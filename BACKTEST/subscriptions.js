// 
// Subscriptions glue plugins to events
// flowing through the Gekko.
// 

var subscriptions = [
  {
    emitter: 'market',
    event: 'candle',
    handler: 'processCandle'
  },
  {
    emitter: 'market',
    event: 'marketUpdate',
    handler: 'processMarketUpdate'
  },
  {
    emitter: 'market',
    event: 'marketStart',
    handler: 'processMarketStart'
  },
  {
    emitter: 'tradingAdvisor',
    event: 'stratWarmupCompleted',
    handler: 'processStratWarmupCompleted'
  },
  {
    emitter: 'tradingAdvisor',
    event: 'advice',
    handler: 'processAdvice'
  },
  {
    emitter: 'tradingAdvisor',
    event: 'stratCandle',
    handler: 'processStratCandle'
  },
  {
    emitter: 'tradingAdvisor',
    event: 'stratUpdate',
    handler: 'processStratUpdate'
  },
  {
    emitter: 'tradingAdvisor',
    event: 'stratNotification',
    handler: 'processStratNotification'
  },
  {
    emitter: ['trader', 'paperTrader'],
    event: 'tradeInitiated',
    handler: 'processTradeInitiated'
  },
  {
    emitter: ['trader', 'paperTrader'],
    event: 'tradeAborted',
    handler: 'processTradeAborted'
  },
  {
    emitter: ['trader', 'paperTrader'],
    event: 'tradeCompleted',
    handler: 'processTradeCompleted'
  },
  {
    emitter: 'trader',
    event: 'tradeCancelled',
    handler: 'processTradeCancelled'
  },
  {
    emitter: 'trader',
    event: 'tradeErrored',
    handler: 'processTradeErrored'
  },
  {
    emitter: ['trader', 'paperTrader'],
    event: 'portfolioChange',
    handler: 'processPortfolioChange'
  },
  {
    emitter: ['trader', 'paperTrader'],
    event: 'triggerCreated',
    handler: 'processTriggerCreated'
  },
  {
    emitter: ['trader', 'paperTrader'],
    event: 'triggerAborted',
    handler: 'processTriggerAborted'
  },
  {
    emitter: ['trader', 'paperTrader'],
    event: 'triggerFired',
    handler: 'processTriggerFired'
  },
  {
    emitter: ['trader', 'paperTrader'],
    event: 'portfolioValueChange',
    handler: 'processPortfolioValueChange'
  },
  {
    emitter: 'performanceAnalyzer',
    event: 'performanceReport',
    handler: 'processPerformanceReport'
  },
  {
    emitter: 'performanceAnalyzer',
    event: 'roundtripUpdate',
    handler: 'processRoundtripUpdate'
  },
  {
    emitter: 'performanceAnalyzer',
    event: 'roundtrip',
    handler: 'processRoundtrip'
  },
];

module.exports = subscriptions;

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

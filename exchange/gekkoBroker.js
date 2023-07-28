//https://github.com/universalbit-dev/gekko-m4/blob/master/docs/gekko-broker/introduction.md
/*
  The broker manages all communicatinn with the exchange, delegating:
  - the management of the portfolio to the portfolioManager
  - the management of actual trades to "orders".
*/

let _ = require('lodash');
require('lodash-migrate');
const async = require('async');
const events = require('events');
const moment = require('moment');
const checker = require('./exchangeChecker');
const errors = require('./exchangeErrors');
const Portfolio = require('./portfolioManager');
// const Market = require('./market');
const orders = require('./orders');
const Trigger = require('./trigger');
const exchangeUtils = require('./exchangeUtils');
const bindAll = exchangeUtils.bindAll;
const isValidOrder = exchangeUtils.isValidOrder;

class Broker {
  constructor(config) {
    this.config = config;

    if(config.private) {
      if(this.cantTrade()) {
        throw new Error(this.cantTrade());
      }
    } else {
      if(this.cantMonitor()) {
        throw new Error(this.cantMonitor());
      }
    }

    this.orders = {
      // contains current open orders
      open: [],
      // contains all closed orders
      closed: []
    }

    const slug = config.exchange.toLowerCase();

    const API = require('./wrappers/' + slug);

    this.api = new API(config);

    this.capabilities = API.getCapabilities();

    this.marketConfig = _.find(this.capabilities.markets, (p) => {
      return _.first(p.pair) === config.currency.toUpperCase() &&
        _.last(p.pair) === config.asset.toUpperCase();
    });

    this.interval = this.api.interval || 1500;

    this.market = config.currency.toUpperCase() + config.asset.toUpperCase();

    if(config.private) {
      this.portfolio = new Portfolio(config, this.api);
    }

    bindAll(this);
  }

  cantTrade() {
    return checker.cantTrade(this.config);
  }

  cantMonitor() {
    return checker.cantMonitor(this.config);
  }

  sync(callback) {
    if(!this.private) {
      this.setTicker();
      return;
    }

    if(this.cantTrade()) {
      throw new errors.ExchangeError(this.cantTrade());
    }

    this.syncPrivateData();
  }

  syncPrivateData(callback) {
    async.series([
      this.setTicker,
      next => setTimeout(next, this.interval),
      this.portfolio.setFee.bind(this.portfolio),
      next => setTimeout(next, this.interval),
      this.portfolio.setBalances.bind(this.portfolio),
      next => setTimeout(next, this.interval)
    ], callback);
  }

  setTicker(callback) {
    this.api.getTicker((err, ticker) => {

      if(err) {
        if(err.message) {
          console.log(this.api.name, err.message);
          throw err;
        } else {
          console.log('err not wrapped in error:', err);
          throw new errors.ExchangeError(err);
        }
      }

      this.ticker = ticker;

      if(_.isFunction(callback))
        callback();
    });
  }

  isValidOrder(amount, price) {
    return isValidOrder({
      market: this.marketConfig,
      api: this.api,
      amount,
      price
    });
  }

  createOrder(type, side, amount, parameters, handler) {
    if(!this.config.private)
      throw new Error('Client not authenticated');

    if(side !== 'buy' && side !== 'sell')
      throw new Error('Unknown side ' + side);

    if(!orders[type])
      throw new Error('Unknown order type');

    const order = new orders[type]({
      api: this.api,
      marketConfig: this.marketConfig,
      capabilities: this.capabilities
    });

    // todo: figure out a smarter generic way
    this.syncPrivateData(() => {
      order.setData({
        balances: this.portfolio.balances,
        ticker: this.ticker,
      });

      order.create(side, amount, parameters);
    });

    order.on('completed', summary => {
      _.remove(this.orders.open, order);
      this.orders.closed.push(summary);
    });

    return order;
  }

  createTrigger({type, onTrigger, props}) {
    return new Trigger({
      api: this.api,
      type,
      onTrigger,
      props
    });
  }
}

module.exports = Broker;

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

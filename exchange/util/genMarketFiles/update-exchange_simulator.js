const _ = require('lodash');
const file=require('file-system');
const fs=require('fs');
const request = require('request-promise');
const Promise = require('bluebird');

let getMinTradeSize = asset => {
  let minTradeSize = 0.00009;
  switch (asset) {
  case 'BTC':
    minTradeSize = '0.00009'
    break;
  default:
    break;
  }
  return minTradeSize;
}

let assetPromise = request({
  url: '',//<===
  headers: {
    Connection: 'keep-alive',
    'User-Agent': 'Request-Promise',
  },
  json: true,
}).then(body => {
  if (!body || !body.result) {
    throw new Error('Unable to fetch list of assets, response was empty')
  } else if (!_.isEmpty(body.error)) {
    throw new Error(`Unable to fetch list of assets: ${body.error}`);
  }
  return body.result;
});

let assetPairsPromise = request({
  url: '',//<===
  headers: {
    Connection: 'keep-alive',
    'User-Agent': 'Request-Promise',
  },
  json: true,
}).then(body => {
  if (!body || !body.result) {
    throw new Error('Unable to fetch list of assets, response was empty')
  } else if (!_.isEmpty(body.error)) {
    throw new Error(`Unable to fetch list of assets: ${body.error}`);
  }
  return body.result;
});

Promise.all([assetPromise, assetPairsPromise])
  .then(results => {
    let assets = _.uniq(_.map(results[1], market => {
      return results[0][market.base].altname;
    }));

    let currencies = _.uniq(_.map(results[1], market => {
      return results[0][market.quote].altname;
    }));

    let marketKeys = _.filter(_.keys(results[1]), k => { return !k.endsWith('.d'); });
    let markets = _.map(marketKeys, k => {
      let market = results[1][k];
      let asset = results[0][market.base];
      let currency = results[0][market.quote];
      return {
        pair: [currency.altname, asset.altname],
        prefixed: [market.quote, market.base],
        book: k,
        minimalOrder: {
          amount: getMinTradeSize(market.base),
          unit: 'asset',
        },
        pricePrecision: market.pair_decimals,
        amountPrecision: market.lot_decimals
      };
    });

    return { assets: assets, currencies: currencies, markets: markets };
  })
  .then(markets => {
    fs.writeFileSync('../../wrappers/exchange_simulator-markets.json', JSON.stringify(markets, null, 2));
    console.log(`Done writing market data`);
  })
  .catch(err => {
    console.log(`Couldn't import data`);
    console.log(err);
  });

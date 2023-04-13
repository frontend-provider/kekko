const _ = require('lodash');
const promisify = require('promisify-node');
const path = require('path');
const scan = promisify(require('../../core/workers/datasetScan/parent'));
const config = require('../../config');
const base_config=require('./baseConfig');

const route = function *() {
  var config = {};
  _.merge(config,base_config,this.request.body);
  this.body = yield scan(config);
};

module.exports = route;

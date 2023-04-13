const _ = require('lodash');
const promisify = require('promisify-node');
const path = require('path');
const scan = promisify(require('../../core/workers/dateRangeScan/parent'));
const config=require('../../config');
const base_config =require('./baseConfig');
// starts a scan
// requires a post body with configuration of:
// 
// - config.watch
const route = function *() {
  var config = {};

  _.merge(config,base_config,this.request.body);

  this.body = yield scan(config);
};

module.exports = route;

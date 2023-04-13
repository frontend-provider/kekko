const cache = require('../state/cache');
const manager = cache.get('apiKeyManager');
var _ = require('../../core/lodash-core');
var util = require('../../core/util');
var dirs = util.dirs();
var config = util.getConfig();

var base_config= require('./baseConfig');
module.exports = {
get: function *()
{
	this.body = manager.get();
},
add: function *() {
	const content = this.request.body;
	manager.add(content.exchange, content.values);
	this.body = {status: 'ok'};
  },
remove: function *() {
    	const exchange = this.request.body.exchange;
    	manager.remove(exchange);
    	this.body = {status: 'ok'};
  }
}

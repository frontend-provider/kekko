/*


*/

var log = require('../core/log.js');
var config = require('../core/util.js').getConfig();
var _ = require('lodash');
var ws = require ('reconnecting-websocket');
var tulind = require('tulind');
 
var strat = {
// INIT
init: function()
	{
this.name = 'Strategy';
this.resetTrend();
// DEBUG
this.debug = true;

//Indicators
this.addTulipIndicator('', '', { optInTimePeriod: this.settings...});
this.addTulipIndicator('', '', { optInTimePeriod: this.settings...});

//Debug
if(this.debug ){
		log.info("==========================================");
		log.info('Running', this.name);
		log.info('==========================================');
	},

};
module.exports = strat;

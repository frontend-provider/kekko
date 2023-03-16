//https://github.com/universalbit-dev/gekko-m4/blob/master/docs/strategies/creating_a_strategy.md
var log = require('../core/log.js');
var config = require('../core/util.js').getConfig();
var _ = require('lodash');
var ws = require ('reconnecting-websocket');
var tulind = require('tulind');
var strat = {

init: function(){
        this.name = 'Strategy';
        this.debug = true;

        this.addTulipIndicator('', '', {});
        this.addTulipIndicator('', '', {});


if(this.debug ){
        log.info("==========================================");
        log.info('Running', this.name);
        log.info('==========================================');
}

},

update: function(){},
log: function(){},
check: function(){},
end: function(){},

};

module.exports = strat;

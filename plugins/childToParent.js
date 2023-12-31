// Small plugin that subscribes to some events, stores
// them and sends it to the parent process.

var log = require('../core/log');
const _ = require('../core/lodash');

const subscriptions = require('../subscriptions');

var util = require('../core/util');
const config = util.getConfig();

const ChildToParent = function() {

  subscriptions
    // .filter(sub => config.childToParent.events.includes(sub.event))
    .forEach(sub => {
      this[sub.handler] = (event, next) => {
        process.send({type: sub.event, payload: event});
        if(_.isFunction(next)) {
          next();
        }
      }
    }, this);

}

module.exports = ChildToParent;

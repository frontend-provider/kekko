// Let's create our own method
var _ = require('lodash');

var method = {};
method.init = _.noop;
method.update = _.noop;
method.log = _.noop;
method.check = _.noop;

module.exports = method;

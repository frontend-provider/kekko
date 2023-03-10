/*

*/

var _ = require('lodash');
var async = require('async');
var Emitter = require('./emitter');
var util = require(__dirname + '/util');
var log = require(util.dirs().core + 'log');
var config = util.getConfig();
var pluginDir = util.dirs().plugins;
var gekkoMode = util.gekkoMode();
var inherits = require('util').inherits;
var pluginHelper = {
  cannotLoad: function(plugin) {
    if(_.has(plugin, 'dependencies'))
      var error = false;
      _.each(plugin.dependencies, function(dep) {
        try {
          var a = require(dep.module);
        }
        catch(e) {
          log.error('ERROR LOADING DEPENDENCY', dep.module);

          if(!e.message) {
            log.error(e);
            util.die();
          }

          if(!e.message.startsWith('Cannot find module'))
            return util.die(e);

          error = [
            'The plugin',
            plugin.slug,
            'expects the module',
            dep.module,
            'to be installed.',
            'However it is not, install',
            'it by running: \n\n',
            '\tnpm install',
            dep.module + '@' + dep.version
          ];
          error.join(' ');
        }
      });

    return error;
  },

  load: function(plugin, next) {

    plugin.config = config[plugin.slug];

    if(!plugin.config || !plugin.config.enabled)
      return next();

    if(!_.includes(plugin.modes, gekkoMode)) {
      log.warn(
        'The plugin',
        plugin.name,
        'does not support the mode',
        gekkoMode + '.',
        'It has been disabled.'
      )
      return next();
    }

    log.info('Setting up:');
    log.info('\t', plugin.name);
    log.info('\t', plugin.description);

    var cannotLoad = pluginHelper.cannotLoad(plugin);
    if(cannotLoad)
    return next(cannotLoad);

    if(plugin.path)
    var Constructor = require(pluginDir + plugin.path(config));
    else
    var Constructor = require(pluginDir + plugin.slug);

    if(plugin.async) {
      inherits(Constructor, Emitter);
    var instance = new Constructor(util.defer(function(err) {
        next(err, instance);
      }), plugin);
      Emitter.call(instance);

      instance.meta = plugin;
    } else {
      inherits(Constructor, Emitter);
      var instance = new Constructor(plugin);
      Emitter.call(instance);

      instance.meta = plugin;
      _.defer(function() {
        next(null, instance); 
      });
    }

    if(!plugin.silent)
      log.info('\n');
  }
}
module.exports = pluginHelper;

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

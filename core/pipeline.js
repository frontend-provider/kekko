/*

  A pipeline implements a full Gekko Flow based on a config and
  a mode. The mode is an abstraction that tells Gekko what market
  to load (realtime, backtesting or importing) while making sure
  all enabled plugins are actually supported by that market.

  Read more here:
  https://gekko.wizb.it/docs/internals/architecture.html

*/
var util = require('./util');
var dirs = util.dirs();
const _ = require('./lodash');

var async = require('async');
var log = require(dirs.core + 'log');
var pipeline = (settings) => {
  var mode = settings.mode;
  var config = settings.config;
  var GekkoStream = require(dirs.core + 'gekkoStream');
  var plugins = [];
  var emitters = {};
  var candleConsumers = [];
  var pluginHelper = require(dirs.core + 'pluginUtil');
  var pluginParameters = require(dirs.gekko + 'plugins');
  var subscriptions = require(dirs.gekko + 'subscriptions');
  var market;
  var loadPlugins = function(next) {
    // load all plugins
    async.mapSeries(
      pluginParameters,
      pluginHelper.load,
      function(error, _plugins) {
        if(error)
          return util.die(error, true);

        plugins = _.compact(_plugins);
        next();
      }
    );
  };

  var referenceEmitters = function(next) {
    _.each(plugins, function(plugin) {
      if(plugin.meta.emits)
        emitters[plugin.meta.slug] = plugin;
    });
    next();
  }

  // Subscribe all plugins to other emitting plugins
  var subscribePlugins = function(next) {
    // events broadcasted by plugins
    var pluginSubscriptions = _.filter(
      subscriptions,
      sub => sub.emitter !== 'market'
    );

    _.each(
      pluginSubscriptions.filter(s => _.isArray(s.emitter)),
      subscription => {
        subscription.emitters = subscription.emitter;
        var singleEventEmitters = subscription.emitter
          .filter(
            s => _.size(plugins.filter(p => p.meta.slug === s))
          );
        if(_.size(singleEventEmitters) > 1) {
          var error = `Multiple plugins are broadcasting`;
          error += ` the event "${subscription.event}" (${singleEventEmitters.join(',')}).`;
          error += 'This is unsupported.'
          util.die(error);
        } else {
          subscription.emitter = _.first(singleEventEmitters);
        }
      }
    );
    _.each(plugins, function(plugin) {
      _.each(pluginSubscriptions, function(sub) {

        if(plugin[sub.handler]) {
          // if a plugin wants to listen
          // to something disabled
          if(!emitters[sub.emitter]) {
            if(!plugin.meta.greedy) {

              let emitterMessage;
              if(sub.emitters) {
                emitterMessage = 'all of the emitting plugins [ ';
                emitterMessage += sub.emitters.join(', ');
                emitterMessage += ' ] are disabled.';
              } else {
                emitterMessage += 'the emitting plugin (' + sub.emitter;
                emitterMessage += ')is disabled.'
              }

              log.error([
                plugin.meta.name,
                'wanted to listen to event',
                sub.event + ',',
                'however',
                emitterMessage,
                plugin.meta.name + ' might malfunction because of it.'
              ].join(' '));
            }
            return;
          }

          emitters[sub.emitter]
            .on(sub.event,
              plugin[
                sub.handler
              ])
        }

      });
    });

    var marketSubscriptions = _.filter(
      subscriptions,
      {emitter: 'market'}
    );
    _.each(plugins, function(plugin) {
      _.each(marketSubscriptions, function(sub) {
        if(plugin[sub.handler]) {
          if(sub.event === 'candle')
            candleConsumers.push(plugin);
        }
      });
    });
    next();
  }

  var prepareMarket = function(next) {
    if(mode === 'backtest' && config.backtest.daterange === 'scan')
      require(dirs.core + 'prepareDateRange')(next);
    else
      next();
  }

  var setupMarket = function(next) {
    // load a market based on the config (or fallback to mode)
    let marketType;
    if(config.market)
      marketType = config.market.type;
    else
      marketType = mode;
    var Market = require(dirs.markets + marketType);
    market = new Market(config);
    next();
  }
  var subscribePluginsToMarket = function(next) {
    var marketSubscriptions = _.filter(
      subscriptions,
      {emitter: 'market'}
    );
    _.each(plugins, function(plugin) {
      _.each(marketSubscriptions, function(sub) {
        if(sub.event === 'candle')
          // these are handled via the market stream
          return;
        if(plugin[sub.handler]) {
          market.on(sub.event, plugin[sub.handler]);
        }
      });
    });
    next();
  }
  log.info('Setting up Gekko in', mode, 'mode');
  log.info('');
  async.series(
    [
      loadPlugins,
      referenceEmitters,
      subscribePlugins,
      prepareMarket,
      setupMarket,
      subscribePluginsToMarket
    ],
    function() {
      var gekkoStream = new GekkoStream(plugins);
      market
        .pipe(gekkoStream)
      market.on('end', gekkoStream.finalize);
    }
  );

}

module.exports = pipeline;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

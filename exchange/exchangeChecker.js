var _=require('lodash');var file= require('file-system');var fs= require('fs');
var moment=require('moment');var errors=require('./exchangeErrors');var Checker=function(){_.bindAll(this);}
Checker.prototype.getExchangeCapabilities=function(slug){if(!fs.existsSync(__dirname+'/wrappers/'+slug+'.js'))
throw new errors.ExchangeError(`Gekko does not know the exchange"${slug}"`);return require('./wrappers/'+slug).getCapabilities();}
Checker.prototype.cantMonitor=function(conf){var slug=conf.exchange.toLowerCase();var exchange=this.getExchangeCapabilities(slug);if(!exchange)
return'Gekko does not support the exchange '+slug;var name=exchange.name;if('monitorError'in exchange)
return'At this moment Gekko can\'t monitor '+name+', find out more info here:\n\n'+exchange.monitorError;var name=exchange.name;if(!_.includes(exchange.currencies,conf.currency))
return'Gekko only supports the currencies [ '+exchange.currencies.join(', ')+' ] at '+name+' (not '+conf.currency+')';if(!_.includes(exchange.assets,conf.asset))
return'Gekko only supports the assets [ '+exchange.assets.join(', ')+' ]  at '+name+' (not '+conf.asset+')';var pair=_.find(exchange.markets,function(p){return p.pair[0]===conf.currency&&p.pair[1]===conf.asset;});if(!pair)
return'Gekko does not support this currency/assets pair at '+name;return false;}
Checker.prototype.cantFetchFullHistory=function(conf){var slug=conf.exchange.toLowerCase();var exchange=this.getExchangeCapabilities(slug);if(this.cantMonitor(conf))
return this.cantMonitor(conf);var name=exchange.name;if(!exchange.providesFullHistory)
return'The exchange '+name+' does not provide full history (or Gekko doesn\'t support importing it)';if("exchangeMaxHistoryAge"in exchange){if(moment(config.importer.daterange.from)<moment().subtract(exchange.exchangeMaxHistoryAge,"days")){return'Unsupported date from! '+exchange.name+' supports history of max '+exchange.exchangeMaxHistoryAge+' days..';}}}
Checker.prototype.cantTrade=function(conf){var cantMonitor=this.cantMonitor(conf);if(cantMonitor)
return cantMonitor;var slug=conf.exchange.toLowerCase();var exchange=this.getExchangeCapabilities(slug);var name=exchange.name;if(!exchange.tradable)
return'At this moment Gekko can\'t trade at '+name+'.';if(conf.key==='your-key')
return'"your-key" is not a valid API key';if(conf.secret==='your-secret')
return'"your-secret" is not a valid API secret';var error=false;_.each(exchange.requires,function(req){if(!conf[req])
error=name+' requires "'+req+'" to be set in the config';},this);return error;}
Checker.prototype.settings=function(conf){var slug=conf.exchange.toLowerCase();return this.getExchangeCapabilities(slug);}
module.exports=new Checker();
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

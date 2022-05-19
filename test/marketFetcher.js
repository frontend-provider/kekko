var chai=require('chai');var expect=chai.expect;var should=chai.should;var assert=chai.assert;var sinon=require('sinon');var proxyquire=require('proxyquire');var _=require('lodash');var moment=require('moment');var util=require(__dirname+'/../core/util');var config=util.getConfig();var dirs=util.dirs();var providerName=config.watch.exchange.toLowerCase();var providerPath=util.dirs().gekko+'exchanges/'+providerName;return; var mf;var spoofer={};var TRADES=[{tid:1,amount:1,price:100,date:1475837937},{tid:2,amount:1,price:100,date:1475837938}];var FakeProvider=function(){};var getTrades=function(since,handler,descending){handler(null,TRADES);}
FakeProvider.prototype={getTrades:getTrades}
spoofer[providerPath]=FakeProvider;var getTradesSpy=sinon.spy(FakeProvider.prototype,'getTrades');var TradeBatcher=require(util.dirs().budfox+'tradeBatcher');var tradeBatcherSpy=sinon.spy(TradeBatcher.prototype,'write');spoofer[util.dirs().budfox+'tradeBatcher']=TradeBatcher;var MarketFetcher=proxyquire(dirs.budfox+'marketFetcher',spoofer);describe('budfox/marketFetcher',function(){it('should throw when not passed a config',function(){expect(function(){new MarketFetcher();}).to.throw('TradeFetcher expects a config');});it('should instantiate',function(){mf=new MarketFetcher(config);});it('should fetch with correct arguments',function(){mf.fetch();expect(getTradesSpy.callCount).to.equal(1);var args=getTradesSpy.firstCall.args;var since=args[0];expect(since).to.equal(undefined);var handler=args[1];assert.isFunction(handler);var descending=args[2];expect(descending).to.equal(false);});xit('should retry on error',function(){});it('should pass the data to the tradebatcher',function(){mf.fetch();expect(getTradesSpy.callCount).to.equal(2);expect(tradeBatcherSpy.lastCall.args[0]).to.deep.equal(TRADES);});xit('should relay trades',function(){});});
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
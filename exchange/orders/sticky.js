/*


*/
_= require('../../core/lodash');const async=require('async');const events=require('events');const moment=require('moment');const errors=require('../exchangeErrors');const BaseOrder=require('./order');const states=require('./states');class StickyOrder extends BaseOrder{constructor({api,marketConfig,capabilities}){super(api);this.market=marketConfig;this.capabilities=capabilities;this.sticking=false;this.roundPrice=this.api.roundPrice.bind(this.api);this.roundAmount=this.api.roundAmount.bind(this.api);if(_.isFunction(this.api.outbidPrice)){this.outbidPrice=this.api.outbidPrice.bind(this.api);}}
create(side,rawAmount,params={}){if(this.completed||this.completing){return false;}
console.log(new Date,'sticky create',side);this.side=side;this.amount=this.roundAmount(rawAmount);this.initialLimit=params.initialLimit;if(side==='buy'){if(params.limit){this.limit=this.roundPrice(params.limit);}else{this.noLimit=true;this.limit=Infinity;}}else{if(params.limit){this.limit=this.roundPrice(params.limit);}else{this.noLimit=true;this.limit=-Infinity;}}
this.status=states.SUBMITTED;this.emitStatus();this.orders={};this.outbid=params.outbid&&_.isFunction(this.outbidPrice);if(this.data&&this.data.ticker){this.price=this.calculatePrice(this.data.ticker);this.createOrder();}else{this.api.getTicker((err,ticker)=>{if(this.handleError(err)){console.log(new Date,'error get ticker');return;}
this.price=this.calculatePrice(ticker);this.createOrder();});}
return this;}
calculatePrice(ticker){const r=this.roundPrice;if(this.initialLimit&&!this.id){console.log('passing initial limit of:',this.limit);return r(this.limit);}
if(this.side==='buy'){if(!this.noLimit&&ticker.bid>=this.limit){return r(this.limit);}
if(!this.outbid){return r(ticker.bid);}
const outbidPrice=this.outbidPrice(ticker.bid,true);if(outbidPrice<=this.limit&&outbidPrice<ticker.ask){return r(outbidPrice);}else{return r(this.limit);}}else if(this.side==='sell'){if(!this.noLimit&&ticker.ask<=this.limit){return r(this.limit);}
if(!this.outbid){return r(ticker.ask);}
const outbidPrice=this.outbidPrice(ticker.ask,false);if(outbidPrice>=this.limit&&outbidPrice>ticker.bid){return r(outbidPrice);}else{return r(this.limit);}}}
createOrder(){if(this.completed||this.completing){return false;}
const alreadyFilled=this.calculateFilled();this.submit({side:this.side,amount:this.roundAmount(this.amount-alreadyFilled),price:this.price,alreadyFilled});}
handleInsufficientFundsError(err){if(!err||err.type!=='insufficientFunds'||!this.capabilities.limitedCancelConfirmation||!this.id){return false;}
const id=this.id;setTimeout(()=>{this.api.getOrder(id,(innerError,res)=>{if(this.handleError(innerError)){return;}
const amount=res.amount;if(this.orders[id].filled===amount){return this.handleError(err);}
this.orders[id].filled=amount;this.emit('fill',this.calculateFilled());if(this.calculateFilled()>=this.amount){return this.filled(this.price);}
setTimeout(this.createOrder,this.checkInterval);});},this.checkInterval);return true;}
handleCreate(err,id){if(this.handleInsufficientFundsError(err)){return;}
if(this.handleError(err)){console.log(new Date,'handleCreate error');return;}
if(!id){console.log('BLUP! no id...');}
if(this.id&&this.orders[this.id]&&this.orders[this.id].filled===0)
delete this.orders[this.id];this.id=id;this.orders[id]={price:this.price,filled:0}
this.emit('new order',this.id);this.status=states.OPEN;this.emitStatus();this.scheduleNextCheck();}
scheduleNextCheck(){this.sticking=false;if(this.cancelling){return this.cancel();}
if(this.movingLimit){return this.moveLimit();}
if(this.movingAmount){return this.moveAmount();}
this.timeout=setTimeout(this.checkOrder,this.checkInterval);}
checkOrder(){if(this.completed||this.completing){return console.log(new Date,'checkOrder called on completed/completing order..',this.completed,this.completing);}
this.sticking=true;this.api.checkOrder(this.id,(err,result)=>{if(this.handleError(err)){console.log(new Date,'checkOrder error');return;}
if(result.open){if(result.filledAmount!==this.orders[this.id].filled){this.orders[this.id].filled=result.filledAmount;this.emit('fill',this.calculateFilled());}
if(this.price==this.limit){this.scheduleNextCheck();return;}
this.api.getTicker((err,ticker)=>{if(this.handleError(err)){console.log(new Date,'getTicker error');return;}
this.ticker=ticker;this.emit('ticker',ticker);const bookSide=this.side==='buy'?'bid':'ask';if(ticker[bookSide]!=this.price){return this.move(this.calculatePrice(ticker));}
this.scheduleNextCheck();});return;}
this.sticking=false;if(!result.executed){this.status=states.REJECTED;this.emitStatus();this.finish();return;}
this.orders[this.id].filled=this.amount;this.emit('fill',this.amount);this.filled(this.price);});}
handleError(error){if(!error){return false;}
console.log(new Date,'[sticky order] FATAL ERROR',error.message);console.log(new Date,error);this.status=states.ERROR;this.emitStatus();this.error=error;this.emit('error',error);return true;}
handleCancel(filled,data){if(filled){this.orders[this.id].filled=this.amount;this.emit('fill',this.amount);this.filled(this.price);return;}
if(_.isObject(data)){let amountFilled=data.filled;if(!amountFilled&&data.remaining){const alreadyFilled=this.calculateFilled();const orderAmount=this.roundAmount(this.amount-alreadyFilled);amountFilled=this.roundAmount(orderAmount-data.remaining);}
if(amountFilled>this.orders[this.id].filled){this.orders[this.id].filled=amountFilled;this.emit('fill',this.calculateFilled());}}
return;}
move(price){if(this.completed||this.completing){return false;}
this.status=states.MOVING;this.emitStatus();this.api.cancelOrder(this.id,(err,filled,data)=>{if(this.handleError(err)){console.log(new Date,'error move');return;}
if(this.handleCancel(filled,data)){return;}
this.price=this.roundPrice(price);this.createOrder();});return true;}
calculateFilled(){let totalFilled=0;_.each(this.orders,(order,id)=>totalFilled+=order.filled);return totalFilled;}
moveLimit(limit){if(this.completed||this.completing){return false;}
if(!limit){limit=this.moveLimitTo;}
if(this.limit===this.roundPrice(limit)){return false;}
if(this.cancelling){return false;}
if(this.status===states.INITIALIZING||this.status===states.SUBMITTED||this.status===states.MOVING||this.sticking){this.moveLimitTo=limit;this.movingLimit=true;return true;}
this.limit=this.roundPrice(limit);clearTimeout(this.timeout);this.movingLimit=false;if(this.side==='buy'&&this.limit<this.price){this.sticking=true;this.move(this.limit);}else if(this.side==='sell'&&this.limit>this.price){this.sticking=true;this.move(this.limit);}else{this.scheduleNextCheck();}
return true;}
moveAmount(amount){if(this.completed||this.completing)
return false;if(!amount)
amount=this.moveAmountTo;if(this.amount===this.roundAmount(amount))
return true;if(this.calculateFilled()>this.roundAmount(amount)){this.filled();return false;}
if(this.status===states.INITIALIZING||this.status===states.SUBMITTED||this.status===states.MOVING||this.sticking){this.moveAmountTo=amount;this.movingAmount=true;return;}
this.amount=this.roundAmount(amount-this.calculateFilled());if(this.amount<this.market.minimalOrder.amount){if(this.calculateFilled()){this.filled();return false;}else{this.handleError(new Error("The amount "+this.amount+" is too small."));}}
clearTimeout(this.timeout);this.movingAmount=false;this.sticking=true;this.api.cancelOrder(this.id,(err,filled,data)=>{if(this.handleError(err)){console.log(new Date,'error cancel');return;}
if(this.handleCancel(filled,data)){return;}
this.createOrder();});return true;}
cancel(){if(this.completed)
return;if(this.status===states.SUBMITTED||this.status===states.MOVING||this.sticking){this.cancelling=true;return;}
this.completing=true;clearTimeout(this.timeout);this.api.cancelOrder(this.id,(err,filled,data)=>{if(this.handleError(err)){console.log(new Date,'error cancel');return;}
this.cancelling=false;if(this.handleCancel(filled,data)){return;}
this.status=states.CANCELLED;this.emitStatus();this.finish(false);})}
createSummary(next){if(!this.completed)
console.log(new Date,'createSummary BUT ORDER NOT COMPLETED!');if(!next)
next=_.noop;const checkOrders=_.keys(this.orders).map(id=>next=>{if(!this.orders[id].filled){return next();}
setTimeout(()=>this.api.getOrder(id,next),this.checkInterval);});async.series(checkOrders,(err,trades)=>{if(err){console.log(new Date,'error createSummary (checkOrder)')
return next(err);}
let price=0;let amount=0;let date=moment(0);_.each(trades,trade=>{if(!trade){return;}
date=moment(trade.date);price=((price*amount)+(+trade.price*trade.amount))/(+trade.amount+amount);amount+=+trade.amount;});const summary={price,amount,date,side:this.side,orders:trades.length}
const first=_.first(trades);if(first&&first.fees){summary.fees={};_.each(trades,trade=>{if(!trade){return;}
_.each(trade.fees,(amount,currency)=>{if(!_.isNumber(summary.fees[currency])){summary.fees[currency]=amount;}else{summary.fees[currency]+=amount;}});});}
if(first&&!_.isUndefined(first.feePercent)){summary.feePercent=0;let amount=0;_.each(trades,trade=>{if(!trade||_.isUndefined(trade.feePercent)){return;}
if(trade.feePercent===0){return;}
summary.feePercent=((summary.feePercent*amount)+(+trade.feePercent*trade.amount))/(+trade.amount+amount);amount+=+trade.amount;});}
this.emit('summary',summary);next(undefined,summary);});}}
module.exports=StickyOrder;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

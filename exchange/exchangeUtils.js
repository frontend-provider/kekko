const retry=require('retry');const errors=require('./exchangeErrors');const _=require('lodash');const retryInstance=(options,checkFn,callback,e)=>{if(!options){options={retries:100,factor:1.2,minTimeout:1*1000,maxTimeout:4*1000};}
let attempt=0;const operation=retry.operation(options);operation.attempt(function(currentAttempt){checkFn((err,result)=>{if(!err){return callback(undefined,result);}
console.log(new Date,err.message);let maxAttempts=err.retry;if(maxAttempts===true)
maxAttempts=10;if(err.retry&&attempt++<maxAttempts){return operation.retry(err);}
if(err.notFatal){if(err.backoffDelay){return setTimeout(()=>operation.retry(err),err.backoffDelay);}
return operation.retry(err);}
callback(err,result);});});}
const allMethods=targetClass=>{const propertys=Object.getOwnPropertyNames(Object.getPrototypeOf(targetClass))
propertys.splice(propertys.indexOf('constructor'),1)
return propertys}
const bindAll=(targetClass,methodNames=[])=>{for(const name of!methodNames.length?allMethods(targetClass):methodNames){targetClass[name]=targetClass[name].bind(targetClass)}}
const isValidOrder=({api,market,amount,price})=>{let reason=false;if(amount<market.minimalOrder.amount){reason='Amount is too small';}
if(_.isFunction(api.isValidPrice)&&!api.isValidPrice(price)){reason='Price is not valid';}
if(_.isFunction(api.isValidLot)&&!api.isValidLot(price,amount)){reason='Lot size is too small';}
return{reason,valid:!reason}}
const scientificToDecimal=num=>{if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)){const zero='0';const parts=String(num).toLowerCase().split('e');const e=parts.pop();const l=Math.abs(e);const sign=e/l;const coeff_array=parts[0].split('.');if(sign===-1){num=zero+'.'+new Array(l).join(zero)+coeff_array.join('');}else{const dec=coeff_array[1];if(dec){l=l-dec.length;}
num=coeff_array.join('')+new Array(l+1).join(zero);}}else{num=num+'';}
return num;}
const cacheFn=(fn,timeout)=>{let nextCall=false;let cache=false;let inflight=false;let callbackQueue=[];return next=>{if(inflight){return callbackQueue.push(next);}
const now=+new Date;if(cache&&now>=nextCall){return next(res.error,res.result);}
inflight=true;fn((error,result)=>{cache={error,result};nextCall=now+timeout;next(error,result);callbackQueue.forEach(cb=>cb(error,result));callbackQueue=[];inflight=false;})}}
module.exports={retry:retryInstance,bindAll,isValidOrder,scientificToDecimal,cacheFn}
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
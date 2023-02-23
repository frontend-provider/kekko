/*


*/
var config=require('./vue/statics/UiConfig');
const koa=require('koa');
const serve=require('koa-static');
const cors=require('koa-cors');
var _=require('../exchange/node_modules/lodash');
const bodyParser=require('koa-bodyparser');
const opn=require('opn');
const server=require('http').createServer();
const router=require('koa-router')();
const ws=require('ws');
const app=koa();const WebSocketServer=require('ws').Server;
const wss=new WebSocketServer({server:server});
const cache=require('./state/cache');
const nodeCommand=_.last(process.argv[1].split('/'));const isDevServer=nodeCommand==='server'||nodeCommand==='server.js';wss.on('connection',ws=>{ws.isAlive=true;ws.on('pong',()=>{ws.isAlive=true;});ws.ping(_.noop);ws.on('error',e=>{console.error(new Date,'[WS] connection error:',e);});});
setInterval(()=>{wss.clients.forEach(ws=>{if(!ws.isAlive){console.log(new Date,'[WS] stale websocket client, terminiating..');
return ws.terminate();}
ws.isAlive=false;ws.ping(_.noop);});},10*1000);const broadcast=data=>{if(_.isEmpty(data)){return;}
const payload=JSON.stringify(data);wss.clients.forEach(ws=>{ws.send(payload,err=>{if(err){console.log(new Date,'[WS] unable to send data to client:',err);}});});}
cache.set('broadcast',broadcast);const ListManager=require('./state/listManager');const GekkoManager=require('./state/gekkoManager');cache.set('imports',new ListManager);cache.set('gekkos',new GekkoManager);cache.set('apiKeyManager',require('./apiKeyManager'));const WEBROOT=__dirname+'/';const ROUTE=n=>WEBROOT+'routes/'+n;const apiKeys=require(ROUTE('apiKeys'));router.get('/api/info',require(ROUTE('info')));router.get('/api/strategies',require(ROUTE('strategies')));router.get('/api/configPart/:part',require(ROUTE('configPart')));router.get('/api/apiKeys',apiKeys.get);const listWraper=require(ROUTE('list'));router.get('/api/imports',listWraper('imports'));router.get('/api/gekkos',listWraper('gekkos'));router.get('/api/exchanges',require(ROUTE('exchanges')));router.post('/api/addApiKey',apiKeys.add);router.post('/api/removeApiKey',apiKeys.remove);router.post('/api/scan',require(ROUTE('scanDateRange')));router.post('/api/scansets',require(ROUTE('scanDatasets')));router.post('/api/backtest',require(ROUTE('backtest')));router.post('/api/import',require(ROUTE('import')));router.post('/api/startGekko',require(ROUTE('startGekko')));router.post('/api/stopGekko',require(ROUTE('stopGekko')));router.post('/api/deleteGekko',require(ROUTE('deleteGekko')));router.post('/api/getCandles',require(ROUTE('getCandles')));app.use(cors()).use(serve(WEBROOT+'vue')).use(bodyParser()).use(require('koa-logger')()).use(router.routes()).use(router.allowedMethods());server.timeout=config.api.timeout||120000;server.on('request',app.callback());server.listen(config.api.port,config.api.host,'::',()=>{const host=`${config.ui.host}:${config.ui.port}${config.ui.path}`;if(config.ui.ssl){var location='https:'}else{var location='http:'}
console.log('Serving Gekko UI on '+location+'\n');if(!isDevServer&&!config.headless){opn(location).catch(err=>{console.log('Something went wrong when trying to open your web browser. UI is running on '+location+'.');});}});
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

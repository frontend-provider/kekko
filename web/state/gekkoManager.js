/*


*/
const _=require('lodash');const moment=require('moment');const broadcast=require('./cache').get('broadcast');const Logger=require('./logger');const pipelineRunner=require('../../core/workers/pipeline/parent');const reduceState=require('./reduceState.js');const now=()=>moment().format('YYYY-MM-DD HH:mm:ss');const GekkoManager=function(){this.gekkos={};this.instances={};this.loggers={};this.archivedGekkos={};}
GekkoManager.prototype.add=function({mode,config}){let type;if(mode==='realtime'){if(config.market&&config.market.type)
type=config.market.type;else
type='watcher';}else{type='';}
let logType=type;if(logType==='leech'){if(config.trader&&config.trader.enabled)
logType='tradebot';else
logType='papertrader';}
const date=now().replace(' ','-').replace(':','-');const n=(Math.random()+'').slice(3);const id=`${date}-${logType}-${n}`;config.childToParent.enabled=true;const state={mode,config,id,type,logType,active:true,stopped:false,errored:false,errorMessage:false,events:{initial:{},latest:{}},start:moment()}
this.gekkos[id]=state;this.loggers[id]=new Logger(id);this.instances[id]=pipelineRunner(mode,config,this.handleRawEvent(id));if(logType==='trader'){config.trader.key='[REDACTED]';config.trader.secret='[REDACTED]';}
console.log(`${now()}Gekko ${id}started.`);broadcast({type:'gekko_new',id,state});return state;}
GekkoManager.prototype.handleRawEvent=function(id){const logger=this.loggers[id];return(err,event)=>{if(err){return this.handleFatalError(id,err);}
if(!event){return;}
if(event.log){return logger.write(event.message);}
if(event.type){this.handleGekkoEvent(id,event);}}}
GekkoManager.prototype.handleGekkoEvent=function(id,event){this.gekkos[id]=reduceState(this.gekkos[id],event);broadcast({type:'gekko_event',id,event});}
GekkoManager.prototype.handleFatalError=function(id,err){const state=this.gekkos[id];if(!state||state.errored||state.stopped)
return;state.errored=true;state.errorMessage=err;console.error('RECEIVED ERROR IN GEKKO INSTANCE',id);console.error(err);broadcast({type:'gekko_error',id,error:err});this.archive(id);if(state.logType==='watcher'){this.handleWatcherError(state,id);}}
GekkoManager.prototype.handleWatcherError=function(state,id){console.log(`${now()}A gekko watcher crashed.`);if(!state.events.latest.candle){console.log(`${now()}was unable to start.`);}
let latestCandleTime=moment.unix(0);if(state.events.latest&&state.events.latest.candle){latestCandleTime=state.events.latest.candle.start;}
const leechers=_.values(this.gekkos).filter(gekko=>{if(gekko.type!=='leech'){return false;}
if(_.isEqual(gekko.config.watch,state.config.watch)){return true;}});if(leechers.length){console.log(`${now()}${leechers.length}leecher(s)were depending on this watcher.`);if(moment().diff(latestCandleTime,'m')<60){console.log(`${now()}Watcher had recent data,starting a new one in a minute.`);setTimeout(()=>{const mode='realtime';const config=state.config;this.add({mode,config});},1000*60);}else{console.log(`${now()}Watcher did not have recent data,killing its leechers.`);leechers.forEach(leecher=>this.stop(leecher.id));}}}
GekkoManager.prototype.stop=function(id){if(!this.gekkos[id])
return false;console.log(`${now()}stopping Gekko ${id}`);this.gekkos[id].stopped=true;this.gekkos[id].active=false;this.instances[id].kill();broadcast({type:'gekko_stopped',id});this.archive(id);return true;}
GekkoManager.prototype.archive=function(id){this.archivedGekkos[id]=this.gekkos[id];this.archivedGekkos[id].stopped=true;this.archivedGekkos[id].active=false;delete this.gekkos[id];broadcast({type:'gekko_archived',id});}
GekkoManager.prototype.delete=function(id){if(this.gekkos[id]){throw new Error('Cannot delete a running Gekko, stop it first.');}
if(!this.archivedGekkos[id]){throw new Error('Cannot delete unknown Gekko.');}
console.log(`${now()}deleting Gekko ${id}`);broadcast({type:'gekko_deleted',id});delete this.archivedGekkos[id];return true;}
GekkoManager.prototype.archive=function(id){this.archivedGekkos[id]=this.gekkos[id];this.archivedGekkos[id].stopped=true;this.archivedGekkos[id].active=false;delete this.gekkos[id];broadcast({type:'gekko_archived',id});}
GekkoManager.prototype.list=function(){return{live:this.gekkos,archive:this.archivedGekkos};}
module.exports=GekkoManager;
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

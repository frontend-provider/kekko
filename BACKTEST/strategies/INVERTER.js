/*
UniversalBit BlockChain INVERTER Strategy
Source Code: [Gab0](https://github.com/Gab0/)
https://github.com/Gab0/gekko-adapted-strategies
Authors:
RSI_BULL_BEAR & RSI_BULL_BEAR_ADX (@TommieHansen)
PingPong Function for sideways market(@RafaelMartín)
(CC BY-SA 4.0:https://creativecommons.org/licenses/by-sa/4.0/)
Extra Indicators : https://github.com/Gab0/gekko-extra-indicators
Gabriel Araujo (@Gab0)
*/

var log = require('../core/log.js');
var config = require('../core/util.js').getConfig();
var coretulind = require('../core/tulind.js');
var _ = require('lodash');
var ws = require ('reconnecting-websocket');
var tulind = require('tulind');

console.log("Tulip Indicators version is:");
console.log(tulind.version);

var strat = {
// INIT
init: function()
	{
this.name = 'INVERTER';
this.resetTrend();
// DEBUG
this.debug = true;

//Indicators
//SMA
this.addTulipIndicator('maFast', 'sma', { optInTimePeriod: this.settings.SMA_long});
this.addTulipIndicator('maSlow', 'sma', { optInTimePeriod: this.settings.SMA_short});
//RSI
this.addTulipIndicator('BULL_RSI', 'rsi', { optInTimePeriod: this.settings.BULL_RSI });
this.addTulipIndicator('BEAR_RSI', 'rsi', { optInTimePeriod: this.settings.BEAR_RSI });
//DEMA
this.addTulipIndicator('longDEMA', 'dema', {optInTimePeriod : this.settings.DEMA_long});
this.addTulipIndicator('shortDEMA', 'dema', {optInTimePeriod : this.settings.DEMA_short});
//RSI
this.addTulipIndicator('rsi', 'rsi', {optInTimePeriod : this.settings.RSI});
//ADX
this.addTulipIndicator('adx', 'adx', {optInTimePeriod: this.settings.ADX});
		
//Mod (RSI modifiers)
this.BULL_MOD_high = this.settings.BULL_MOD_high;
this.BULL_MOD_low = this.settings.BULL_MOD_low;
this.BEAR_MOD_high = this.settings.BEAR_MOD_high;
this.BEAR_MOD_low = this.settings.BEAR_MOD_low;
//Stop Loss Stop Gain
this.Stop_Loss_Percent = this.settings.Stop_Loss_Percent;
this.Stop_Gain_Percent = this.settings.Stop_Gain_Percent;
this.stoplow = 0.0;
this.stophigh = 0.0;
this.lastLongPrice = 0.0;
//Short Spread
this.Min_Loss_Percent = this.settings.Min_Loss_Percent;
this.Min_Gain_Percent = this.settings.Min_Gain_Percent;
//Debug
this.startTime = new Date();
if( this.debug ){
this.stat = {adx: { min: 1000, max: 0 },bear: { min: 1000, max: 0 },bull: { min: 1000, max: 0 }};}
//Messages
		log.info("==========================================");
		log.info('Running', this.name);
		log.info('==========================================');
	},
//Reset Trend
resetTrend: function()
{
let trend = {duration: 0,direction: 'none',longPos: 0,pingPong : {gainsPercentage: this.settings.PINGPONG_GAINS_PERCENTAGE }};
this.trend = trend;
//Log Trend
console.log(this.trend);
},
//Low/High backtest-period
lowHigh: function(val,type)
{
let cur = this.stat.bear;
if( type == 'bear' )
{
cur = this.stat.bear;
if( val < cur.min ) this.stat.bear.min = val;
	else if( val > cur.max ) this.stat.bear.max = val;
}

if( type == 'bull' )
{
cur = this.stat.bull;
	if( val < cur.min ) this.stat.bull.min = val;
	else if( val > cur.max ) this.stat.bull.max = val;
}

else
{
cur = this.stat.adx;
if( val < cur.min ) this.stat.adx.min = val;
	else if( val > cur.max ) this.stat.adx.max = val;
}
  },
//Check
check: function()
{
//Indicators
let ind=this.tulipIndicators,
rsi =this.tulipIndicators.rsi.result,
maSlow =this.tulipIndicators.maSlow.result,   
maFast =this.tulipIndicators.maFast.result,   
longDEMA =this.tulipIndicators.longDEMA.result,   
shortDEMA=this.tulipIndicators.shortDEMA.result,
adx=this.tulipIndicators.adx.result;

switch (this.candle.close) {
        case ((this.candle.close < this.stoplow)&&(this.stoplow != 0.0)):
        this.advice('long');
        break;
        case ((this.candle.close > this.stophigh)&&(this.stophigh != 0.0)):
        this.advice('short');
        break;
}

//Bear
if((longDEMA < shortDEMA) && (maFast < maSlow))
{
	rsi = ind.BEAR_RSI.result.result;
	let rsi_hi = this.settings.BEAR_RSI_high,
        rsi_low = this.settings.BEAR_RSI_low;
// Adx
	if( adx > this.settings.ADX_high ) rsi_hi = rsi_hi + this.BEAR_MOD_high;
	else if( adx < this.settings.ADX_low ) rsi_low = rsi_low + this.BEAR_MOD_low;

	if( rsi > rsi_hi ) this.short();
	else if( rsi < rsi_low ) this.long();
	else this.pingPong();
	this.lowHigh( rsi, 'bear' );
}

//Bull
else
{
rsi = ind.BULL_RSI.result.result;
let rsi_hi = this.settings.BULL_RSI_high,rsi_low = this.settings.BULL_RSI_low;

	if( adx > this.settings.ADX_high ) rsi_hi = rsi_hi + this.BULL_MOD_high;
	else if( adx < this.settings.ADX_low ) rsi_low = rsi_low + this.BULL_MOD_low;

	if( rsi > rsi_hi ) this.short();
	else if( rsi < rsi_low ) this.long();
	else this.pingPong();

	this.lowHigh( rsi, 'bull' );
}

},

//LONG
long: function()
{
	if( this.trend.direction !== 'up' )
	{
	this.resetTrend();
	this.trend.direction = 'up';
	this.trend.longPos = this.candle.close;
	this.lastLongPrice = this.candle.close;
	this.stoplow = this.lastLongPrice-(this.lastLongPrice* this.Stop_Loss_Percent / 100);
	this.stophigh = this.lastLongPrice+(this.lastLongPrice* this.Stop_Gain_Percent / 100);
	this.advice('long');
	}
	if( this.debug )
	{
	this.trend.duration++;
	log.info('Long since', this.trend.duration, 'candle(s)');
	log.info(this.trend.direction);
	}
	},

//SHORT
	short: function()
	{
	if ((this.trend.direction !== 'down') || ((this.stoplow != 0.0 ) && (this.candle.close < this.stoplow )) || ((this.stophigh != 0.0 ) && (this.candle.close > this.stophigh)) )
	{
 	this.resetTrend();
 	this.trend.direction = 'down';
 	this.trend.longPos = false;
 	this.advice('short');
 	if(this.debug) log.info('Going short');
 	}

	if( this.debug )
	{
	this.trend.duration++;
	log.info('Short since', this.trend.duration, 'candle(s)');
	log.info(this.trend.direction);
	}
	},

//PingPong
pingPong: function() {
 switch (this.trend.longPos)
{
        case this.trend.direction == 'up':
        this.resetTrend();
        this.trend.longPos = true;
        break;
        case this.trend.direction == 'down':
        this.resetTrend();
        this.trend.longPos = false;
        break;
        default:
        this.trend.longPos = this.candle.close;
}
},

//End Backtest
	end: function()
	{
	let seconds = ((new Date()- this.startTime)/1000),minutes = seconds/60,str;
	minutes < 1 ? str = seconds.toFixed(2) + ' seconds' : str = minutes.toFixed(2) + ' minutes';
	log.info('====================================');
	log.info('Finished in ' + str);
	log.info('====================================');
// Stats and Messages
	let stat = this.stat;
	log.info('BEAR RSI low/high: ' + stat.bear.min + ' / ' + stat.bear.max);
	log.info('BULL RSI low/high: ' + stat.bull.min + ' / ' + stat.bull.max);
	log.info('ADX min/max: ' + stat.adx.min + ' / ' + stat.adx.max);
	}

};
module.exports = strat;

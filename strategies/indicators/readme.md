* [UniversalBit-Dev](https://github.com/universalbit-dev/gekko-m4)
* [Support](https://github.com/universalbit-dev/universalbit-dev/tree/main/support)

#### Snippet code and info links.

#### [Tulip Node](https://www.npmjs.com/package/tulind)
Tulip Node is the official node.js wrapper for Tulip Indicators. It provides 100+ technical analysis indicator functions, such as: simple moving average, Bollinger Bands, MACD, Parabolic SAR, Stochastic Oscillator, and many more.

##### NPM package must be installed in the [gekko-m4](https://github.com/universalbit-dev/gekko-m4) NodeJs environment
```
npm install tulind --build-from-source
```

### Add tulipindicator:

#### [RSI](https://en.wikipedia.org/wiki/Relative_strength_index)
[: wikipedia.org]
The relative strength index (RSI) is a technical indicator used in the analysis of financial markets. It is intended to chart the current and historical strength or weakness of a stock or market based on the closing prices of a recent trading period. The indicator should not be confused with relative strength.

#### optInTimePeriod Sensible Values: {optInTimePeriod : number}
```
this.addTulipIndicator('rsi', 'rsi', {optInTimePeriod :14 });
```

#### [SMA](https://en.wikipedia.org/wiki/Moving_average)
[: wikipedia.org]
simple moving average (SMA)...is normally taken from an equal number of data on either side of a central value. 

```
this.addTulipIndicator('sma', 'sma', {optInTimePeriod :9 });
```

#### [DEMA](https://en.wikipedia.org/wiki/Double_exponential_moving_average)
[: wikipedia.org]
The Double Exponential Moving Average (DEMA) indicator was introduced in January 1994 by Patrick G. Mulloy, 
in an article in the "Technical Analysis of Stocks & Commodities" magazine: 
"Smoothing Data with Faster Moving Averages".

```
this.addTulipIndicator('dema', 'dema', {optInTimePeriod:9} );
```

#### [ADX](https://en.wikipedia.org/wiki/Average_directional_movement_index)
[: wikipedia]
The ADX is a combination of two other indicators developed by Wilder, the positive directional indicator (abbreviated +DI) and negative directional indicator (-DI).
The ADX combines them and smooths the result with a smoothed moving average.
```
this.addTulipIndicator('adx', 'adx',{optInTimePeriod:14} );
```

#### [BollingerBands](https://en.wikipedia.org/wiki/Bollinger_Bands)
[: wikipedia]
Bollinger Bands are a type of statistical chart characterizing the prices and volatility over time of a financial instrument or commodity, using a formulaic method propounded by John Bollinger in the 1980s.

##### bbands Sensible Values: {optInNbStdDevs:number,optInNbStdDevs:number,optInTimePeriod:number}
```
this.addTulipIndicator('bbands', 'bbands', {optInNbStdDevs: 2,optInNbStdDevs:2,optInTimePeriod:20});
```

#### Useful info:
```
  log.info('================================================');
  log.info('keep calm and make somethig of amazing');
  log.info('================================================');
```

#### Add Indicator
```
this.addTulipIndicator('rsi', 'rsi', {optInTimePeriod :14 });
this.addTulipIndicator('sma', 'sma', {optInTimePeriod :9 });
this.addTulipIndicator('adx', 'adx',{optInTimePeriod:14} );
this.addTulipIndicator('dema', 'dema', {optInTimePeriod:9} );
this.addTulipIndicator('bbands', 'bbands', {optInNbStdDevs: 2,optInNbStdDevs:2,optInTimePeriod:20});
```

#### Assign indicator result to a variable. 
```
rsi=this.tulipIndicators.rsi.result.result;
sma=this.tulipIndicators.sma.result.result;
adx=this.tulipIndicators.adx.result.result;
dema=this.tulipIndicators.dema.result.result;
bbands = this.tulipIndicators.bbands.result;
```

#### Display results in console
```
if(rsi != undefined)log.info('RSI:',rsi);
if(sma != undefined)log.info('SMA:',sma);
if(adx != undefined)log.info('ADX:',adx);
if(dema != undefined)log.info('DEMA:',dema);
if(bbands != undefined)log.info('BBANDS:',bbands);
```

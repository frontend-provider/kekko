### Gekko-M4 Setup Static IP Address

-----

##### baseUIconfig.js and UIconfig.js  
these two files allow different settings

this example allows to access the graphic interface through a static ip address.


```
nano /web/baseUIconfig.js

```

```
const CONFIG={headless:true,api:{host:'192.168.1.146',port:3007,timeout:12000},ui:{ssl:false,host:'192.168.1.146',port:3007,path:'/'}}
if(typeof window==='undefined')
module.exports=CONFIG;
else
window.CONFIG=CONFIG;

/*

The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me

*/

```


```
nano /web/vue/statics/UiConfig.js

```

```
const CONFIG = {
  headless: true,
  api: {
    host: "192.168.1.146",
    port: 3007,
    timeout: 60000 // 10 minutes
  },
  ui: {
    ssl: false,
    host: "192.168.1.146",
    port: 3007,
    path: "/"
  },
  adapter: "sqlite",

userChartConfig:{
//patterns:['hasInvertedHammer']
indicators: ['abs','acos','ad','add','adosc','adx','adxr','ao','apo','aroon',
'aroonosc','asin','atan','atr','avgprice','bbands','bop','cci','ceil','cmo','cos',
'cosh', 'crossany','crossover','cvi','decay', 'dema','di','div','dm',
'dpo','dx','edecay','ema','emv','exp', 'fisher','floor','fosc','hma',
'kama','kvo','lag','linreg','linregintercept','linregslope','ln','log10',
'macd','marketfi','mass', 'max','md','medprice','mfi','min','mom','msw',
'mul','natr','nvi','obv','ppo','psar','pvi','qstick','roc','rocr','round',
'rsi','sin','sinh','sma','sqrt','stddev','stderr','stoch','stochrsi','sub',
'sum','tan','tanh','tema', 'todeg','torad','tr','trima','trix','trunc','tsf',
'typprice','ultosc','var','vhf','vidya','volatility',
'vosc','vwma','wad','wcprice','wilders','willr','wma','zlema']
//overlays: []
}
};

if (typeof window === "undefined") module.exports = CONFIG;
else window.CONFIG = CONFIG;

/* Gekko Gordon UI 
The MIT License (MIT) Copyright (c) 2018 Klemens Wittig /*

```

Documentation:
* [configuring_gekko_on_a_server](https://github.com/askmike/gekko/blob/develop/docs/installation/configuring_gekko_on_a_server.md)

* [webserver_nginx_reverse_proxy](https://github.com/universalbit-dev/gekko-m4/blob/master/docs/webserver.md)


#### Gekko UI Run Application:

```
pm2 start gekko-m4.js
```
OR 
```
node gekko.js -c config.js --ui
```

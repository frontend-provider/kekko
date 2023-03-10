### Gekko-M4 Setup Static IP Address

-----
##### baseUIconfig.js
```
nano /web/baseUIconfig.js
```
```
const CONFIG = {
  headless: false,
  api: {
    host: '192.168.1.146',
    port: 3007,
    timeout: 120000
  },
  ui: {
    ssl: false,
    host: '192.168.1.146',
    port: 3007,
    path: '/'
  },
  adapter: 'sqlite'
}

if(typeof window === 'undefined')
  module.exports = CONFIG;
else
  window.CONFIG = CONFIG;

```

##### UIconfig.js  
```
nano /web/vue/statics/UiConfig.js
```

```
const CONFIG = {
  headless: false,
  api: {
    host: "192.168.1.146",
    port: 3007,
    timeout: 10 * 60 * 1000 // 10 minutes
  },
  ui: {
    ssl: false,
    host: "192.168.1.146",
    port: 3007,
    path: "/"
  },
  adapter: "sqlite",
  
  userChartConfig: {
    //patterns:['hasInvertedHammer']
    indicators: [
      "macd",
      "macdSignal",
      "macdHistogram",
      "mystdev",
      "dmPlus",
      "dmLow",
      "momentum"
    ]
    //overlays: []
  }
};

if (typeof window === "undefined") module.exports = CONFIG;
else window.CONFIG = CONFIG;
```


Documentation:
* [configuring_gekko_on_a_server](https://github.com/askmike/gekko/blob/develop/docs/installation/configuring_gekko_on_a_server.md)

* [webserver_nginx_reverse_proxy](https://github.com/universalbit-dev/gekko-m4/blob/master/docs/webserver.md)


#### Gekko UI Run Application:

```
pm2 start gekko-m4.js
```

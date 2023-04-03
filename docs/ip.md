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
    indicators: []
    //overlays: []
  }
};

if (typeof window === "undefined") module.exports = CONFIG;
else window.CONFIG = CONFIG;
```

* [webserver_nginx_reverse_proxy](https://github.com/universalbit-dev/gekko-m4/blob/master/docs/webserver.md)
* [webserver_apache2_reverse_proxy](https://github.com/universalbit-dev/gekko-m4/blob/master/docs/webserver.md#webserver-apache2)

#### Run Application:
```
pm2 start gekko-m4.js
```

# Gekko-M4
#### unlike easy gains
#### Gekko is a framework for develop your own cryptocurrency trading strategy.

***This software is for educational purposes only. Do not risk money which
you are afraid to lose. USE THE SOFTWARE AT YOUR OWN RISK. THE AUTHORS
AND ALL AFFILIATES ASSUME NO RESPONSIBILITY FOR YOUR TRADING RESULTS.***

-----

#### Gekko 
The MIT License (MIT) Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me


Gekko-M4 The MIT License (MIT) Copyright (c) 2022 UniversalBit Blockchain This Software unlike easy gains
#### Targets:
improve graphic and correct some errors, enhance the application by solving some vulnerabilities.

-----
During these years (from June 2021) I am committed to understanding how this application could work and there is still a lot of work to be done. this application is not intended as a quick profit use.


##### Gekko-M4 [Buy/Sell]
##### help to improve the UniversalBit Blockchain Project
##### Donation Address : 
BTC:
bc1qjvs87zn8mwt37aat3jm7vmqp9lt56rnxkh3ey8![Alt text](https://github.com/universalbit-dev/armadillium-gridbot/blob/main/cryptocurrency_icon/btc.svg "bitcoin-indicator")

LTC:
ltc1qxmevaw3pwt6a6rfzy4hx7s3jyc60p575a59hky![Alt text](https://github.com/universalbit-dev/armadillium-gridbot/blob/main/cryptocurrency_icon/ltc.svg "litecoin-indicator")

[introduction](https://universalbit.it/blockchain/gekko-m4/)


Install [Build Essential](https://packages.debian.org/bullseye/build-essential): 
this package is required for building Debian packages.

```
apt install build-essential
```

##### NVM Node Version Manager:
nvm allows you to quickly install and use different versions of node via the command line.
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
##### Installation NodeJs version 12
```
nvm install 12
```

clone project and start learn
```
git clone https://github.com/universalbit-dev/gekko-m4.git
cd gekko-m4
```

##### Install Node-Gyp :
node-gyp is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js. [node-gyp](https://www.npmjs.com/package/node-gyp)
```
npm i node-gyp -g

```
### Installation of Gekko-M4 from source: eternal development
```
npm i --build-from-source

```
-Tulind Indicators : It provides 100+ technical analysis indicator functions [tulind npm](https://www.npmjs.com/package/tulind)

-Database Sqlite and Sqlite3 [sqlite npm](https://www.npmjs.com/package/sqlite)
```
npm i tulind --save
npm i sqlite3 --save
```
#### Exchanges: 
exchange directory: /exchange
```
cd /exchange
npm i --build-from-source
```
Thanks developers.

### Start Application using Pm2
---

#### [Setup Static-IP](https://github.com/universalbit-dev/gekko-m4/blob/master/docs/ip.md)

---

enable [cluster-mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/#cluster-mode)
##### [Pm2 Process Manager](https://www.npmjs.com/package/pm2)

```
npm i pm2 -g
pm2 start gekko-m4.js

pm2 monit
```
![Pm2 Monit](https://github.com/universalbit-dev/gekko-m4/blob/master/2022-12-13%2002-58-41-002.png)

Front-end:
Gekko Gordon UI edition  Author:[Klemens Wittig](https://github.com/H256/gekko-quasar-ui)

![Gekko-Gordon](https://github.com/universalbit-dev/gekko-m4/blob/master/2022-12-13%2002-57-57.png)

-----
## BackTest : simulate your strategy.

[BackTest](https://github.com/universalbit-dev/gekko-m4/tree/master/BACKTEST)

####  CCXT Library
On the crypto road : probably not necessary but the project looks interesting
ccxt-js library: a JavaScript / Python / PHP library for cryptocurrency trading and e-commerce with support for many bitcoin/ether/altcoin exchange markets and merchant APIs. [ccxt](https://github.com/universalbit-dev/ccxt/tree/master/doc)

#### Standard node commands:
First Run User Interface:
```
node gekko -c config.js --ui
```

Terminal with DEBUG Messages:
```
node gekko -c config.js
```
-----

##### Crypto Icons
extract archive file crypto-[icons](https://cryptoicons.net/icons.php)
directory: web/vue/statics
```
tar –xvzf crypto_icons.tar.gz
```

* Webserver [Nginx](https://github.com/universalbit-dev/gekko-m4/blob/master/docs/webserver.md)
* Configure [IP](https://universalbit.it:3000/universalbit-blockchain/Gekko-M4/src/master/docs/ip.md)
* Exchange  [API](https://universalbit.it:3000/universalbit-blockchain/Gekko-M4/src/master/docs/api.md)

Note:
There are no easy gains

###### Custom Strategy: INVERTER
This strategy intended as "low freq trade",buy-sell in the event of a sudden rise or an uptrend period.

### Resources:
* [Documentation](https://gekko.wizb.it/docs/installation/installing_gekko.html)
* [Forum](https://forum.gekko.wizb.it/)
* [Strategies](https://github.com/xFFFFF/Gekko-Strategies)
* [Extra-Indicators](https://github.com/Gab0/gekko-extra-indicators)

##### Offline Documentation: [doc](https://universalbit.it/blockchain/shared-files/1093/docs.tar.gz)


log files are written to this folder : logs/
```
tail -f logs/2022-00-00-00-00-watcher-8032292293309007.log
tail -f logs/2022-00-00-00-00-tradebot-04218329122948088.log
```

[Legal context](https://www.europarl.europa.eu/cmsdata/150761/TAX3%20Study%20on%20cryptocurrencies%20and%20blockchain.pdf)
Each exchange requires registration, 2fa and verify identity.



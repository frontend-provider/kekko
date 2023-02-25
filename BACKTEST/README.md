#### BackTest your strategy:
[![RoundTrips](https://github.com/universalbit-dev/gekko-m4/blob/master/BACKTEST/img/gekko-m4_backtest.png)]( "backtest")
 Quasar Framework 1.22.5 [UI](https://github.com/universalbit-dev/gekko-quasar-ui)
 
#### Installation:

```
git clone https://github.com/universalbit-dev/gekko-m4.git
cd BACKTEST
```
---

#### NVM Node Version Manager:
nvm allows you to quickly install and use different versions of node via the command line.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

#### Installation NodeJs version 12
```
nvm install 12
```

#### Install Node-Gyp :
node-gyp is a cross-platform command-line tool written in js for compiling native addon modules for Node.js.

```
npm i node-gyp -g
```

```
npm i --build-from-source
```

#### Tulind Indicators : It provides 100+ technical analysis indicator

#### Database Sqlite3

```
npm i tulind --save
npm i sqlite3 --save
```


#### Exchanges:
exchange directory: /BACKTEST/exchange

```
cd BACKTEST/exchange
npm i --build-from-source
```

#### SSL Create Certificates
```
mkdir ssl
openssl req -x509 -newkey rsa:4096 -nodes -out ssl/cert.pem -keyout ssl/key.pem -days 99999
```

#### First Run User Interface:
```
pm2 start gekko-m4.js
```
or
```
node gekko -c config.js --ui
```

#### User Interface: [BackTest]
```
http://192.168.1.146:3000
```
#### [Setup/Change Static-IP](https://github.com/universalbit-dev/gekko-m4/blob/master/docs/ip.md)

---

Import Data: (Integrating the CCXT library would simplify data import operations)
#### Importer still works with these two exchanges 
#### | Binance | Kraken |

[![RoundTrips](https://github.com/universalbit-dev/gekko-m4/blob/master/BACKTEST/img/import_data.png)]( "backtest")
---







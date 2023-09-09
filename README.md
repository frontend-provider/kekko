##### [Support UniversalBit Project](https://github.com/universalbit-dev/universalbit-dev/tree/main/support)

##### [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)

### Gekko-[M4](http://www.wikisky.org/starview?object_type=4&object_id=3)
#### unlike easy gains
#### This software is for educational purposes only. Do not risk money which you are afraid to lose. USE THE SOFTWARE AT YOUR OWN RISK. THE AUTHORS AND ALL AFFILIATES ASSUME NO RESPONSIBILITY FOR YOUR TRADING RESULTS.

#### Learning [Javascript](https://github.com/universalbit-dev/gekko-m4/tree/master/docs/learning/javascript)

#### Gekko-M4 Engine node v20.4.0 (npm v9.7.2)
-----


#### Required Packages:

```
sudo apt install curl git build-essential
```

##### NVM Node Version Manager:
nvm allows you to quickly install and use different versions of node via the command line.
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

##### [NodeJs 20](https://nodejs.org/en/blog/release/v20.0.0)

```
nvm install 20
nvm use 20
```

clone project:
```
git clone https://github.com/universalbit-dev/gekko-m4.git
cd gekko-m4
```
#### Install:
-Engine
```
npm i && npm audit fix
```
Thanks developers.

#### Run Gekko-M4 
```
npm i pm2 -g
pm2 start gekko-m4.js --env development
```
#### [Pm2 Process Manager](https://pm2.keymetrics.io/docs/usage/quick-start/)


#### Importer
```
node gekko.js -c config.js --import
```
#### Backtest
```
node gekko.js -c config.js --backtest
```

### [BackTest-Tool]

#### Required Packages:
```
sudo apt install perl 
```
#### Install dependencies:
```
cpan install Parallel::ForkManager Time::Elapsed Getopt::Long List::MoreUtils File::chdir Statistics::Basic DBI  DBD::SQLite JSON::XS TOML File::Basename File::Find::Wanted Template LWP::UserAgent LWP::Protocol::https Set::CrossProduct DBD::CSV Text::Table File::Copy  
```
#### Usage
```
usage: perl backtest.pl [mode] [optional parameter]
To run other features
Mode:
  -i, --import	 - Import new datasets
  -g, --paper	 - Start multiple sessions of PaperTrader
  -v, --convert TOMLFILE - Convert TOML file to Gekko's CLI config format, ex: backtest.pl -v MACD.toml
  -a, --analyze CSVFILE	 - Perform comparision of strategies and pairs from csv file, ex: backtest.pl -a database.csv
Optional parameters:
  -c, --config		 - BacktestTool config file. Default is backtest-config.pl
  -s, --strat STRAT_NAME - Define strategies for backtests. You can add multiple strategies seperated by commas example: backtest.pl --strat=MACD,CCI
  -p, --pair PAIR	 - Define pairs to backtest in exchange:currency:asset format ex: backtest.pl --p bitfinex:USD:AVT. You can add multiple pairs seperated by commas.
  -p exchange:ALL	 - Perform action on all available pairs. Other usage: exchange:USD:ALL to perform action for all USD pairs.
  -n, --candle CANDLE	 - Define candleSize and warmup period for backtest in candleSize:warmup format, ex: backtest.pl -n 5:144,10:73. You can add multiple values seperated by commas.
  -ft, --period DAYS - Time range in days - perform action on period from last x days ex: backtest.pl -ft 7
  -f, --from		- Time range for backtest datasets or import. Example: backtest.pl --from="2018-01-01 09:10" --to="2018-01-05 12:23"
  -t, --to
  -f last		- Start import from last candle available in DB. If pair not exist in DB then start from 24h ago.
  -t now		- 'now' is current time in GMT.
  -o, --output FILENAME - CSV file name.

```

#### Run BackTest-Tool
```
perl ./backtest.pl
```

#### [Tulip Node](https://www.npmjs.com/package/tulind)
Tulip Node is the official node.js wrapper for Tulip Indicators. It provides 100+ technical analysis indicator functions, such as: simple moving average, Bollinger Bands, MACD, Parabolic SAR, Stochastic Oscillator, and many more.
```
npm install tulind --build-from-source
```
#### [Bitcoin-Chart-cli](https://github.com/madnight/bitcoin-chart-cli)
##### installation:
```
npm install bitcoin-chart-cli -g
```
#### Usage
```
# run default
bitcoin-chart-cli

# run with options
bitcoin-chart-cli --coin ETH -d 360 -w 80 -h 20

# run with your own api key for higher requests limits
export CRYPTOCOMPARE_API_KEY=your_api_key
bitcoin-chart-cli --coin XRP -ti RSI SMA BB EMA MACD
```





---
#### Resources:
* Gekko-Quasar-UI [0.6.9-m4](https://github.com/universalbit-dev/gekko-quasar-ui)
* Webserver [Apache2 and Nginx](https://github.com/universalbit-dev/gekko-m4/blob/master/docs/webserver.md)
* [Docs](https://github.com/universalbit-dev/gekko-m4/tree/master/docs)
* [Gekko WebSite](https://gekko.wizb.it/docs/installation/installing_gekko.html)
* [Forum](https://forum.gekko.wizb.it/)
* [Strategies](https://github.com/xFFFFF/Gekko-Strategies)
* [Extra-Indicators](https://github.com/Gab0/gekko-extra-indicators)
* [Legal context](https://www.europarl.europa.eu/cmsdata/150761/TAX3%20Study%20on%20cryptocurrencies%20and%20blockchain.pdf)





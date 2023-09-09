# ccxt-ohlcv
##### (open,high,low,close,volume)
fetches OHLCV values from most crypto exchanges using [ccxt](https://pypi.org/project/ccxt/) module.
Saves candles to a sqlite database.
by default resumes from last candle fetched.
##### setup
##### install python3 and virtualenv:
```
sudo apt install python3 python3-pip
pip3 install virtualenv
```
##### [virtual python environments](https://github.com/pypa/virtualenv)
```
virtualenv --python=python3 virtualenv
source virtualenv/bin/activate
sudo pip3 install -r requirements.txt
```
##### sqlite installation on gnu/linux
```
sudo apt install sqlite sqlite3
```
##### run ccxt-ohlcv-fetcher
```
./ccxt-ohlcv-fetch.py
```
##### get 10 min candles of LTC/BTC data from exchange
```
./ccxt-ohlcv-fetch.py -s 'LTC/BTC' -e exchange -t 10m --debug

./ccxt-ohlcv-fetch.py -s 'LTC/BTC' -e exchange -t 10m --since 2023-08-27T00:00:00Z --debug
```

##### convert .sqlite to CSV File (example: exchange LTC/BTC 10 minute candles)
```
sqlite3 exchange_LTCBTC_10m.sqlite
sqlite> .headers on
sqlite> .mode csv
sqlite> .output data.csv
sqlite> SELECT * FROM candles;
sqlite> .quit
```

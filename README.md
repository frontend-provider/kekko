##### [Support UniversalBit Project](https://github.com/universalbit-dev/universalbit-dev/tree/main/support)

### Gekko-[M4](http://www.wikisky.org/starview?object_type=4&object_id=3)
#### unlike easy gains
#### This software is for educational purposes only. Do not risk money which you are afraid to lose. USE THE SOFTWARE AT YOUR OWN RISK. THE AUTHORS AND ALL AFFILIATES ASSUME NO RESPONSIBILITY FOR YOUR TRADING RESULTS.
-----

#### enhance the application by solving some vulnerabilities.
Gekko-M4 Engine run on Nodejs Version (v18.14.2) Npm (9.5.0)
-----

##### [Support UniversalBit Project](https://github.com/universalbit-dev/universalbit-dev/tree/main/support)

#### Required Packages:

```
sudo apt install curl git build-essential
```

##### NVM Node Version Manager:
nvm allows you to quickly install and use different versions of node via the command line.
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

##### [NodeJs 18 LTS](https://nodejs.org/en/download/)

```
nvm install 18
nvm use 18
```

clone project:
```
git clone https://github.com/universalbit-dev/gekko-m4.git
cd gekko-m4
```

#### installation:

-Engine
```
npm i --build-from-source
```
Thanks developers.

#### Run Gekko-M4 
```
npm i pm2 -g
pm2 start gekko-m4.js --env development
```
[Pm2 Process Manager](https://pm2.keymetrics.io/docs/usage/quick-start/)


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
#### Run
```
perl ./backtest.pl
```
---
### Resources:
* Gekko-Quasar-UI [0.6.9-m4](https://github.com/universalbit-dev/gekko-quasar-ui)
* Webserver [Apache2 and Nginx](https://github.com/universalbit-dev/gekko-m4/blob/master/docs/webserver.md)
* [Docs](https://github.com/universalbit-dev/gekko-m4/tree/master/docs)
* [Gekko WebSite](https://gekko.wizb.it/docs/installation/installing_gekko.html)
* [Forum](https://forum.gekko.wizb.it/)
* [Strategies](https://github.com/xFFFFF/Gekko-Strategies)
* [Extra-Indicators](https://github.com/Gab0/gekko-extra-indicators)
*[Legal context](https://www.europarl.europa.eu/cmsdata/150761/TAX3%20Study%20on%20cryptocurrencies%20and%20blockchain.pdf)
*[Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)



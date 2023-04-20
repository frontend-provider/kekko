
# BudFox
BudFox is a small part of Gekko's core that aggregates realtime market data from any supported exchange into a readable stream of candles. Example usage:
```
    var config = {
        exchange: 'exchange_simulator',
        currency: 'LTC',
        asset: 'BTC'
    }

    new BudFox(config)
      .start()
      // convert JS objects to JSON string
      .pipe(new require('stringify-stream')())
      // output to standard out
      .pipe(process.stdout);
```

```
Outputs:   {"start":"2015-02-02T23:08:00.000Z","open":238.21,"high":239.35,"low":238.21,"close":238.66,"vwp":8743.778447997309,"volume":203.6969347,"trades":56}
    {"start":"2015-02-02T23:09:00.000Z","open":239.03,"high":240,"low":238.21,"close":239.19,"vwp":8725.27119145289,"volume":323.66383462999994,"trades":72}
```
From: [doc](https://gekko.wizb.it/docs/introduction/about_gekko.html)

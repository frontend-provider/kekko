/*


*/
let _ = require('../../core./lodash');
require('lodash-migrate');
const async = require('async');
let fs = require('fs-extra');
const util = require('../../core/util.js');
const config = util.getConfig();
const dirs = util.dirs();
var sqlite3 = require('sqlite3');
// todo: rewrite with generators or async/await..
module.exports = done => {
  const dbDirectory = dirs.gekko + config.sqlite.dataDirectory

  if(!fs.existsSync(dbDirectory))
    return done(null, []);

  const files = fs.readdirSync(dbDirectory);

  const dbs = files
    .filter(f => {
      let parts = f.split('.');
      if(_.last(parts) === 'db')
        return true;
    })

  if(!_.size(dbs))
    return done(null, []);

  let markets = [];

  async.each(dbs, (db, next) => {

    const exchange = _.first(db.split('_'));
    const handle = new sqlite3.Database(dbDirectory + '/' + db, sqlite3.OPEN_READONLY, err => {
      if(err)
        return next(err);

      handle.all(`SELECT name FROM sqlite_master WHERE type='table'`, (err, tables) => {
        if(err)
          return next(err);

        _.each(tables, table => {
          let parts = table.name.split('_');
          let first = parts.shift();
          if(first === 'candles')
            markets.push({
              exchange: exchange,
              currency: _.first(parts),
              asset: _.last(parts)
            });
        });

        next();
      });
    });


  },
  // got all tables!
  err => {
    done(err, markets);
  });
}

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

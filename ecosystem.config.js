module.exports = {
  apps :
  [{
    name: 'gekko-m4',script: './gekko-m4.js',
    env: {NODE_ENV: 'development'},
    name: 'backtest',script: './backtest.pl',
    env_backtest: {NODE_ENV: 'development'}
  },

  {
    name: 'gekko',script: 'node gekko -c config.js --ui'
  }]

}

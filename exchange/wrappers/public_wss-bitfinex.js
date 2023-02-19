/*


*/
const ws = require('ws')
const w = new ws('wss://api-pub.bitfinex.com/ws/2')

w.on('message', (msg) => console.log(msg))

let msg = JSON.stringify({ 
  event: 'subscribe', 
  channel: 'trades', 
  symbol: 'tLTCBTC' 
})

w.on('open', () => w.send(msg))

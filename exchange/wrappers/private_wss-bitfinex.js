/*


*/
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
const crypto = require('crypto-js')
const WebSocket = require('ws')
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();

const Trader = function(config) {
  _.bindAll(this);
  this.key="";
  this.secret="";
  if(_.isObject(config)) {
    this.key = config.key;
    this.secret = config.secret;
    this.currency = config.currency;
    this.asset = config.asset;
    this.pair = this.asset + this.currency;
    this.name = 'Bitfinex';
    this.balance;
    this.price;
    this.bitfinex= new Bitfinex.RESTv1({apiKey:this.key,apiSecret:this.secret,transform:true});this.interval=4000;
  };
  this.nonce = new Date() * 1000;
}

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

//Private Auth
const apiKey = '';     //<=== APIKEY
const apiSecret = '';  //<=== APISECRET
const authNonce = Date.now() * 1000;
const authPayload = 'AUTH' + authNonce;
const authSig = crypto.HmacSHA384(authPayload, apiSecret).toString(crypto.enc.Hex);

const payload = {
  apiKey,
  authSig,
  authNonce,
  authPayload,
  event: 'auth',
}

const BITFINEX_WS_PRIVATE_URL='wss://api.bitfinex.com/ws/2';
function connectBitFinexWSPrivateApi(apiKey) {
  const secretKey = '';
  const nonce = Date.now();
  const sign = CryptoJS.HmacSHA512(apiKey + nonce, secretKey).toString(CryptoJS.enc.Base64);
  const data = [];

  createBitFinexWSConnection(BITFINEX_WS_PRIVATE_URL, data);
}

const wss = new WebSocket('wss://api.bitfinex.com/ws/2');
wss.on('open', () => wss.send(JSON.stringify(payload)))
wss.on('message', (msg) => {
  let response = JSON.parse(msg)
  console.log(msg)
})

var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
const CryptoJS = require('crypto-js');
const { createWSConnection } = require('./WebSocketsPolyfill');
const EXMO_WS_BASE_URL = `wss://ws-api.exmo.com:443/v1`;
const EXMO_WS_PUBLIC_URL = `${EXMO_WS_BASE_URL}/public`;
const EXMO_WS_PRIVATE_URL = `${EXMO_WS_BASE_URL}/private`;


const Trader = function(config) {
  _.bindAll(this);
  this.key="";
  this.secret="";
  if(_.isObject(config)) {
      if(_.isString(config.key)) this.key = config.key;
      if(_.isString(config.secret)) this.secret = config.secret;
      this.currency = config.currency;
      this.asset = config.asset;
      this.pair = this.asset + '_' + this.currency;
  };
  this.name = 'EXMO';
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
client.connect('ws://localhost:3010/', 'echo-protocol');

function createExmoWSConnection(url, messages) {
  const socket = createWSConnection(url);
  const onMessage = (event) => console.log('message:', event);
  const onClose = (event) => console.log('connection closed:', event);
  const onError = (error) => console.log('connection error:', error);
  const onInitialize = () => {
    console.log('connection opened');

    for (let message of messages) {
      console.log('sending:', message);
      socket.send(message);
    }
  };

  socket.on('open', onInitialize);
  socket.on("message", onMessage);
  socket.on('close', onClose);
  socket.on('error', onError);
}

function connectExmoWSPublicApi() {
  const data = [
    '{"id":1,"method":"subscribe","topics":["spot/trades:BTC_LTC","spot/ticker:LTC_BTC"]}',
  ];

  createExmoWSConnection(EXMO_WS_PUBLIC_URL, data);
}
 
//Private Auth
const apiKey='';     //<===APIKEY
const secreKey='';   //<===APISECRET
function connectExmoWSPrivateApi(apiKey) {
  const secretKey = '';
  const nonce = Date.now();
  const sign = CryptoJS.HmacSHA512(apiKey + nonce, secretKey).toString(CryptoJS.enc.Base64);
  const data = [
    `{"id":1,"method":"login","api_key":"${apiKey}","sign":"${sign}","nonce":${nonce}}`,
    '{"id":2,"method":"subscribe","topics":["spot/orders","spot/user_trades"]}',
    '{"id":3,"method":"subscribe","topics":["spot/trades:BTC_LTC","spot/ticker:LTC_BTC"]}',
  ];

  createExmoWSConnection(EXMO_WS_PRIVATE_URL, data);
}

module.exports = {
  connectExmoWSPublicApi,
  connectExmoWSPrivateApi,
};

var fs= require('fs');
var file = require('file-system');
var _=require('lodash');
var cache=require('./state/cache');
var broadcast=cache.get('broadcast');
var apiKeysFile=__dirname+'/../SECRET-api-keys.json';
var noApiKeysFile=!fs.existsSync(apiKeysFile);if(noApiKeysFile)
fs.writeFileSync(apiKeysFile,JSON.stringify({}));
var apiKeys=JSON.parse(fs.readFileSync(apiKeysFile,'utf8'));module.exports={get:()=>_.keys(apiKeys),add:(exchange,props)=>{apiKeys[exchange]=props;fs.writeFileSync(apiKeysFile,JSON.stringify(apiKeys));broadcast({type:'apiKeys',exchanges:_.keys(apiKeys)});},remove:exchange=>{if(!apiKeys[exchange])
return;delete apiKeys[exchange];fs.writeFileSync(apiKeysFile,JSON.stringify(apiKeys));broadcast({type:'apiKeys',exchanges:_.keys(apiKeys)});},_getApiKeyPair:key=>apiKeys[key]}
var WebSocketClient = require('websocket').client;

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

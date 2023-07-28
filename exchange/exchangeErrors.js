let _=require('lodash');require('lodash-migrate');const ExchangeError=function(message){_.bindAll(this);this.name="ExchangeError";this.message=message;}
ExchangeError.prototype=new Error();const ExchangeAuthenticationError=function(message){_.bindAll(this);this.name="ExchangeAuthenticationError";this.message=message;}
ExchangeAuthenticationError.prototype=new Error();const RetryError=function(message){_.bindAll(this);this.name="RetryError";this.retry=5;this.message=message;}
RetryError.prototype=new Error();const AbortError=function(message){_.bindAll(this);this.name="AbortError";this.message=message;}
AbortError.prototype=new Error();module.exports={ExchangeError,ExchangeAuthenticationError,RetryError,AbortError};
/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

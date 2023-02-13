var semver = require('semver');
var _ = require('lodash');

// validate that talib is installed, if not we'll throw an exception which will
// prevent further loading or out outside this module
try {
    var tulind = require('tulind');
} catch (e) {
    module.exports = null;
    return;
}

var tulindError = 'Gekko was unable to configure Tulip Indicators:\n\t';

// Wrapper that executes a tulip indicator
var execute = function(callback, params) {
    var tulindCallback = function(err, result) {
        if (err) return callback(err);
        var table = {}
        for (var i = 0; i < params.results.length; ++i) {
            table[params.results[i]] = result[i];
        }
        callback(null, table);
    };

    return params.indicator.indicator(params.inputs, params.options, tulindCallback);
}

// Helper that makes sure all required parameters
// for a specific talib indicator are present.
var verifyParams = (methodName, params) => {
    var requiredParams = methods[methodName].requires;

    _.each(requiredParams, paramName => {
        if(!_.has(params, paramName)) {
            throw new Error(tulindError + methodName + ' requires ' + paramName + '.');
        }

        var val = params[paramName];

        if(!_.isNumber(val)) {
            throw new Error(tulindError + paramName + ' needs to be a number');
        }
    });
}

var methods = {};

methods.ad = {
    requires: [],
    create: (params) => {
        verifyParams('ad', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.ad,
            inputs: [data.high, data.low, data.close, data.volume],
            options: [],
            results: ['result'],
        });
    }
}

methods.adosc = {
    requires: ['optInFastPeriod', 'optInSlowPeriod'],
    create: (params) => {
        verifyParams('adosc', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.adosc,
            inputs: [data.high, data.low, data.close, data.volume],
            options: [params.optInFastPeriod, params.optInSlowPeriod],
            results: ['result'],
        });
    }
}

methods.adx = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('adx', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.adx,
            inputs: [data.high, data.low, data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.adxr = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('adxr', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.adxr,
            inputs: [data.high, data.low, data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.ao = {
    requires: [],
    create: (params) => {
        verifyParams('ao', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.ao,
            inputs: [data.high, data.low],
            options: [],
            results: ['result'],
        });
    }
}

methods.apo = {
    requires: ['optInFastPeriod', 'optInSlowPeriod'],
    create: (params) => {
        verifyParams('apo', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.apo,
            inputs: [data.close],
            options: [params.optInFastPeriod, params.optInSlowPeriod],
            results: ['result'],
        });
    }
}

methods.aroon = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('aroon', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.aroon,
            inputs: [data.high, data.low],
            options: [params.optInTimePeriod],
            results: ['aroonDown', 'aroonUp'],
        });
    }
}

methods.aroonosc = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('aroonosc', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.aroonosc,
            inputs: [data.high, data.low],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.atr = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('atr', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.atr,
            inputs: [data.high, data.low, data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.avgprice = {
    requires: [],
    create: (params) => {
        verifyParams('avgprice', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.avgprice,
            inputs: [data.open, data.high, data.low, data.close],
            options: [],
            results: ['result'],
        });
    }
}

methods.bbands = {
    requires: ['optInTimePeriod', 'optInNbStdDevs'],
    create: (params) => {
        verifyParams('bbands', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.bbands,
            inputs: [data.close],
            options: [params.optInTimePeriod, params.optInNbStdDevs],
            results: ['bbandsLower', 'bbandsMiddle', 'bbandsUpper'],
        });
    }
}

methods.bop = {
    requires: [],
    create: (params) => {
        verifyParams('bop', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.bop,
            inputs: [data.open, data.high, data.low, data.close],
            options: [],
            results: ['result'],
        });
    }
}

methods.cci = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('cci', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.cci,
            inputs: [data.high, data.low, data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.cmo = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('cmo', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.cmo,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.cvi = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('cvi', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.cvi,
            inputs: [data.high, data.low],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.dema = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('dema', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.dema,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.di = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('di', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.di,
            inputs: [data.high, data.low, data.close],
            options: [params.optInTimePeriod],
            results: ['diPlus', 'diMinus'],
        });
    }
}

methods.dm = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('dm', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.dm,
            inputs: [data.high, data.low],
            options: [params.optInTimePeriod],
            results: ['dmPlus', 'dmLow'],
        });
    }
}

methods.dpo = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('dpo', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.dpo,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.dx = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('dx', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.dx,
            inputs: [data.high, data.low, data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.ema = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('ema', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.ema,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.emv = {
    requires: [],
    create: (params) => {
        verifyParams('emv', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.emv,
            inputs: [data.high, data.low, data.volume],
            options: [params.optInTimePeriod],
            results: [],
        });
    }
}

methods.fisher = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('fisher', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.fisher,
            inputs: [data.high, data.low],
            options: [params.optInTimePeriod],
            results: ['fisher', 'fisherPeriod'],
        });
    }
}

methods.fosc = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('fosc', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.fosc,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.hma = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('hma', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.hma,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.kama = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('kama', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.kama,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.kvo = {
    requires: ['optInFastPeriod', 'optInSlowPeriod'],
    create: (params) => {
        verifyParams('kvo', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.kvo,
            inputs: [data.high, data.low, data.close, data.volume],
            options: [params.optInFastPeriod, params.optInSlowPeriod],
            results: ['result'],
        });
    }
}

methods.linreg = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('linreg', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.linreg,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.linregintercept = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('linregintercept', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.linregintercept,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.linregslope = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('linregslope', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.linregslope,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.macd = {
    requires: ['optInFastPeriod', 'optInSlowPeriod', 'optInSignalPeriod'],
    create: (params) => {
        verifyParams('macd', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.macd,
            inputs: [data.close],
            options: [params.optInFastPeriod, params.optInSlowPeriod, params.optInSignalPeriod],
            results: ['macd', 'macdSignal', 'macdHistogram'],
        });
    }
}

methods.marketfi = {
    requires: [],
    create: (params) => {
        verifyParams('marketfi', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.marketfi,
            inputs: [data.high, data.low, data.volume],
            options: [],
            results: ['result'],
        });
    }
}

methods.mass = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('mass', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.mass,
            inputs: [data.high, data.low],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.medprice = {
    requires: [],
    create: (params) => {
        verifyParams('medprice', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.medprice,
            inputs: [data.high, data.low],
            options: [],
            results: ['result'],
        });
    }
}

methods.mfi = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('mfi', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.mfi,
            inputs: [data.high, data.low, data.close, data.volume],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.msw = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('msw', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.msw,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['mswSine', 'mswLead'],
        });
    }
}

methods.natr = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('natr', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.natr,
            inputs: [data.high, data.low, data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.nvi = {
    requires: [],
    create: (params) => {
        verifyParams('nvi', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.nvi,
            inputs: [data.close, data.volume],
            options: [],
            results: ['result'],
        });
    }
}

methods.obv = {
    requires: [],
    create: (params) => {
        verifyParams('obv', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.obv,
            inputs: [data.close, data.volume],
            options: [],
            results: ['result'],
        });
    }
}

methods.ppo = {
    requires: ['optInFastPeriod', 'optInSlowPeriod'],
    create: (params) => {
        verifyParams('ppo', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.ppo,
            inputs: [data.close],
            options: [params.optInFastPeriod, params.optInSlowPeriod],
            results: ['result'],
        });
    }
}

methods.psar = {
    requires: ['optInAcceleration', 'optInMaximum'],
    create: (params) => {
        verifyParams('psar', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.psar,
            inputs: [data.high, data.low],
            options: [params.optInAcceleration, params.optInMaximum],
            results: ['result'],
        });
    }
}

methods.pvi = {
    requires: [],
    create: (params) => {
        verifyParams('pvi', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.pvi,
            inputs: [data.close, data.volume],
            options: [],
            results: ['result'],
        });
    }
}

methods.qstick = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('qstick', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.qstick,
            inputs: [data.open, data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.roc = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('roc', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.roc,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.rocr = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('rocr', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.rocr,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.rsi = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('rsi', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.rsi,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.sma = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('sma', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.sma,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.stddev = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('stddev', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.stddev,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.stoch = {
    requires: ['optInFastKPeriod', 'optInSlowKPeriod', 'optInSlowDPeriod'],
    create: (params) => {
        verifyParams('stoch', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.stoch,
            inputs: [data.high, data.low, data.close],
            options: [params.optInFastKPeriod, params.optInSlowKPeriod, params.optInSlowDPeriod],
            results: ['stochK', 'stochD'],
        });
    }
}

methods.stochrsi = {
    requires: ['optInPeriod'],
    create: (params) => {
        verifyParams('stochrsi', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.stochrsi,
            inputs: [data.close],
            options: [params.optInPeriod],
            results: ['stochRsi'],
        });
    }
}

methods.sum = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('sum', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.sum,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.tema = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('tema', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.tema,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.tr = {
    requires: [],
    create: (params) => {
        verifyParams('tr', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.tr,
            inputs: [data.high, data.low, data.close],
            options: [],
            results: ['result'],
        });
    }
}

methods.trima = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('trima', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.trima,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.trix = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('trix', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.trix,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.tsf = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('tsf', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.tsf,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.typprice = {
    requires: [],
    create: (params) => {
        verifyParams('typprice', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.typprice,
            inputs: [data.high, data.low, data.close],
            options: [],
            results: ['result'],
        });
    }
}

methods.ultosc = {
    requires: ['optInTimePeriod1', 'optInTimePeriod2', 'optInTimePeriod3'],
    create: (params) => {
        verifyParams('ultosc', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.ultosc,
            inputs: [data.high, data.low, data.close],
            options: [params.optInTimePeriod1, params.optInTimePeriod2, params.optInTimePeriod3],
            results: ['result'],
        });
    }
}

methods.vhf = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('vhf', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.vhf,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.vidya = {
    requires: ['optInFastPeriod', 'optInSlowPeriod', 'optInAlpha'],
    create: (params) => {
        verifyParams('vidya', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.vidya,
            inputs: [data.close],
            options: [params.optInFastPeriod, params.optInSlowPeriod, params.optInAlpha],
            results: ['result'],
        });
    }
}

methods.volatility = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('volatility', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.volatility,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.vosc = {
    requires: ['optInFastPeriod', 'optInSlowPeriod'],
    create: (params) => {
        verifyParams('vosc', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.vosc,
            inputs: [data.volume],
            options: [params.optInFastPeriod, params.optInSlowPeriod],
            results: ['result'],
        });
    }
}

methods.vwma = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('vwma', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.vwma,
            inputs: [data.close, data.volume],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.wad = {
    requires: [],
    create: (params) => {
        verifyParams('wad', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.wad,
            inputs: [data.high, data.low, data.close],
            options: [],
            results: ['result'],
        });
    }
}

methods.wcprice = {
    requires: [],
    create: (params) => {
        verifyParams('wcprice', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.wcprice,
            inputs: [data.high, data.low, data.close],
            options: [],
            results: ['result'],
        });
    }
}

methods.wilders = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('wilders', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.wilders,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.willr = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('willr', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.willr,
            inputs: [data.high, data.low, data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.wma = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('wma', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.wma,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

methods.zlema = {
    requires: ['optInTimePeriod'],
    create: (params) => {
        verifyParams('zlema', params);

        return (data, callback) => execute(callback, {
            indicator: tulind.indicators.zlema,
            inputs: [data.close],
            options: [params.optInTimePeriod],
            results: ['result'],
        });
    }
}

module.exports = methods;
/*
      GNU LESSER GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.


  This version of the GNU Lesser General Public License incorporates
the terms and conditions of version 3 of the GNU General Public
License, supplemented by the additional permissions listed below.

  0. Additional Definitions.

  As used herein, "this License" refers to version 3 of the GNU Lesser
General Public License, and the "GNU GPL" refers to version 3 of the GNU
General Public License.

  "The Library" refers to a covered work governed by this License,
other than an Application or a Combined Work as defined below.

  An "Application" is any work that makes use of an interface provided
by the Library, but which is not otherwise based on the Library.
Defining a subclass of a class defined by the Library is deemed a mode
of using an interface provided by the Library.

  A "Combined Work" is a work produced by combining or linking an
Application with the Library.  The particular version of the Library
with which the Combined Work was made is also called the "Linked
Version".

  The "Minimal Corresponding Source" for a Combined Work means the
Corresponding Source for the Combined Work, excluding any source code
for portions of the Combined Work that, considered in isolation, are
based on the Application, and not on the Linked Version.

  The "Corresponding Application Code" for a Combined Work means the
object code and/or source code for the Application, including any data
and utility programs needed for reproducing the Combined Work from the
Application, but excluding the System Libraries of the Combined Work.

  1. Exception to Section 3 of the GNU GPL.

  You may convey a covered work under sections 3 and 4 of this License
without being bound by section 3 of the GNU GPL.

  2. Conveying Modified Versions.

  If you modify a copy of the Library, and, in your modifications, a
facility refers to a function or data to be supplied by an Application
that uses the facility (other than as an argument passed when the
facility is invoked), then you may convey a copy of the modified
version:

   a) under this License, provided that you make a good faith effort to
   ensure that, in the event an Application does not supply the
   function or data, the facility still operates, and performs
   whatever part of its purpose remains meaningful, or

   b) under the GNU GPL, with none of the additional permissions of
   this License applicable to that copy.

  3. Object Code Incorporating Material from Library Header Files.

  The object code form of an Application may incorporate material from
a header file that is part of the Library.  You may convey such object
code under terms of your choice, provided that, if the incorporated
material is not limited to numerical parameters, data structure
layouts and accessors, or small macros, inline functions and templates
(ten or fewer lines in length), you do both of the following:

   a) Give prominent notice with each copy of the object code that the
   Library is used in it and that the Library and its use are
   covered by this License.

   b) Accompany the object code with a copy of the GNU GPL and this license
   document.

  4. Combined Works.

  You may convey a Combined Work under terms of your choice that,
taken together, effectively do not restrict modification of the
portions of the Library contained in the Combined Work and reverse
engineering for debugging such modifications, if you also do each of
the following:

   a) Give prominent notice with each copy of the Combined Work that
   the Library is used in it and that the Library and its use are
   covered by this License.

   b) Accompany the Combined Work with a copy of the GNU GPL and this license
   document.

   c) For a Combined Work that displays copyright notices during
   execution, include the copyright notice for the Library among
   these notices, as well as a reference directing the user to the
   copies of the GNU GPL and this license document.

   d) Do one of the following:

       0) Convey the Minimal Corresponding Source under the terms of this
       License, and the Corresponding Application Code in a form
       suitable for, and under terms that permit, the user to
       recombine or relink the Application with a modified version of
       the Linked Version to produce a modified Combined Work, in the
       manner specified by section 6 of the GNU GPL for conveying
       Corresponding Source.

       1) Use a suitable shared library mechanism for linking with the
       Library.  A suitable mechanism is one that (a) uses at run time
       a copy of the Library already present on the user's computer
       system, and (b) will operate properly with a modified version
       of the Library that is interface-compatible with the Linked
       Version.

   e) Provide Installation Information, but only if you would otherwise
   be required to provide such information under section 6 of the
   GNU GPL, and only to the extent that such information is
   necessary to install and execute a modified version of the
   Combined Work produced by recombining or relinking the
   Application with a modified version of the Linked Version. (If
   you use option 4d0, the Installation Information must accompany
   the Minimal Corresponding Source and Corresponding Application
   Code. If you use option 4d1, you must provide the Installation
   Information in the manner specified by section 6 of the GNU GPL
   for conveying Corresponding Source.)

  5. Combined Libraries.

  You may place library facilities that are a work based on the
Library side by side in a single library together with other library
facilities that are not Applications and are not covered by this
License, and convey such a combined library under terms of your
choice, if you do both of the following:

   a) Accompany the combined library with a copy of the same work based
   on the Library, uncombined with any other library facilities,
   conveyed under the terms of this License.

   b) Give prominent notice with the combined library that part of it
   is a work based on the Library, and explaining where to find the
   accompanying uncombined form of the same work.

  6. Revised Versions of the GNU Lesser General Public License.

  The Free Software Foundation may publish revised and/or new versions
of the GNU Lesser General Public License from time to time. Such new
versions will be similar in spirit to the present version, but may
differ in detail to address new problems or concerns.

  Each version is given a distinguishing version number. If the
Library as you received it specifies that a certain numbered version
of the GNU Lesser General Public License "or any later version"
applies to it, you have the option of following the terms and
conditions either of that published version or of any later version
published by the Free Software Foundation. If the Library as you
received it does not specify a version number of the GNU Lesser
General Public License, you may choose any version of the GNU Lesser
General Public License ever published by the Free Software Foundation.

  If the Library as you received it specifies that a proxy can decide
whether future versions of the GNU Lesser General Public License shall
apply, that proxy's public statement of acceptance of any version is
permanent authorization for you to choose that version for the
Library.

© 2021 GitHub, Inc.
Terms
*/



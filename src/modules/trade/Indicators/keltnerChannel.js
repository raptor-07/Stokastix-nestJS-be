"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keltner = function (candleData) {
    var length = 20;
    var mult = 3;
    var atrlength = 10;
    var ema = function (length) {
        var alpha = 2 / (length + 1);
        var _emaArray = [];
        _emaArray[0] = Number(candleData[0][4]);
        for (var i = 1; i < candleData.length; i++) {
            _emaArray.push(alpha * Number(candleData[i][4]) + (1 - alpha) * _emaArray[i - 1]);
        }
        return _emaArray[_emaArray.length - 1];
    };
    var atr = function (_atrLength) {
        var _rmaArray = [];
        var trueRangeArray = [];
        trueRangeArray[0] = Number(candleData[0][2]) - Number(candleData[0][3]);
        for (var i = 1; i < candleData.length; i++) {
            trueRangeArray.push(Math.max(Math.max(Number(candleData[i][2]) - Number(candleData[i][3]), Math.abs(Number(candleData[i][2]) - Number(candleData[i - 1][4]))), Math.abs(Number(candleData[i][3]) - Number(candleData[i - 1][4]))));
        }
        var alpha = 1 / _atrLength;
        _rmaArray[0] = trueRangeArray[0];
        for (var i = 1; i < candleData.length; i++) {
            _rmaArray.push(alpha * trueRangeArray[i] + (1 - alpha) * _rmaArray[i - 1]);
        }
        return _rmaArray[_rmaArray.length - 1];
    };
    var ma = ema(length);
    var rangema = atr(atrlength);
    var upper = ma + rangema * mult;
    var lower = ma - rangema * mult;
    return {
        upper: Number(upper.toFixed(2)),
        base: Number(ma.toFixed(2)),
        lower: Number(lower.toFixed(2)),
    };
};
exports.default = keltner;

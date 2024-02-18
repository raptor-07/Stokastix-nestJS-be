const keltner = (
  candleData: any[],
): { upper: number; base: number; lower: number } => {
  const length = 20;
  const mult = 3;
  const atrlength = 10;

  const ema = (length: number): number => {
    let alpha = 2 / (length + 1);
    let _emaArray: number[] = [];
    _emaArray[0] = Number(candleData[0][4]);
    for (let i = 1; i < candleData.length; i++) {
      _emaArray.push(
        alpha * Number(candleData[i][4]) + (1 - alpha) * _emaArray[i - 1],
      );
    }
    return _emaArray[_emaArray.length - 1];
  };

  const atr = (_atrLength: number): number => {
    let _rmaArray: number[] = [];
    let trueRangeArray: number[] = [];
    trueRangeArray[0] = Number(candleData[0][2]) - Number(candleData[0][3]);
    for (let i = 1; i < candleData.length; i++) {
      trueRangeArray.push(
        Math.max(
          Math.max(
            Number(candleData[i][2]) - Number(candleData[i][3]),
            Math.abs(Number(candleData[i][2]) - Number(candleData[i - 1][4])),
          ),
          Math.abs(Number(candleData[i][3]) - Number(candleData[i - 1][4])),
        ),
      );
    }
    let alpha = 1 / _atrLength;
    _rmaArray[0] = trueRangeArray[0];
    for (let i = 1; i < candleData.length; i++) {
      _rmaArray.push(
        alpha * trueRangeArray[i] + (1 - alpha) * _rmaArray[i - 1],
      );
    }
    return _rmaArray[_rmaArray.length - 1];
  };

  const ma = ema(length);
  const rangema = atr(atrlength);
  const upper = ma + rangema * mult;
  const lower = ma - rangema * mult;

  return {
    upper: Number(upper.toFixed(2)),
    base: Number(ma.toFixed(2)),
    lower: Number(lower.toFixed(2)),
  };
};

export default keltner;
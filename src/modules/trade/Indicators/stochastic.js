exports.stochastic = (candleData) => {
    const periodK = 14
    const smoothK = 6
    const stoch = (_candleData, length) => {
        let highArray = [], lowArray = []
        for (let j = 0; j < length; j++) {

            highArray.push(Number(_candleData[_candleData.length - j - 1][2]))
            lowArray.push(Number(_candleData[_candleData.length - j - 1][3]))
            // }

        }

        return 100 * (Number(_candleData[_candleData.length - 1][4]) - Math.min(...lowArray)) / (Math.max(...highArray) - Math.min(...lowArray))
    }

    const sma = (_candleData, length) => {
        let _sma = 0
        for (let i = 0; i < length; i++) {
            _sma += stoch(
                _candleData.slice(0, _candleData.length - i),
                periodK,
            )
            // _sma = _sma+ stoch(_candleData.slice(0,_candleData.length-i),periodK)/smoothK
        }
        return _sma / smoothK
    }


    const k = sma(candleData, smoothK)

    // console.log(toTime(candleData[candleData.length-1][0]))
    // console.log(k)

    return k.toFixed(2)
}
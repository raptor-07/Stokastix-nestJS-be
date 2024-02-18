const macd = (candleData) => {

    // let a = new Date(candleData[candleData.length-1][0])
    // console.log(`${a}`)
    // console.log(`close : ${candleData[candleData.length-1][4]}`)

    // Getting inputs
    const fast_length = 12
    const slow_length = 26
    const src = "close" //Index 1,2,3,4 for O,H,L,C
    const signal_length = 9
    const sma_source = "EMA" //options=["SMA", "EMA"])
    const sma_signal = "EMA" //options=["SMA", "EMA"])

    let srcArray = []
    for (let i = 0; i < candleData.length; i++) {
        srcArray.push(Number(candleData[i][4]))
    }

    // Plot colors
    const col_macd = "#2962FF"
    const col_signal = "#FF6D00"
    const col_grow_above = "green"
    const col_fall_above = "red"
    const col_grow_below = "green"
    const col_fall_below = "red"
    // Calculating

    let macdArray = [], fast_maArray = [], slow_maArray = []

    for (let i = 0; i < candleData.length; i++) {
        fast_maArray.push(
            sma_source == "SMA" ?
                sma(srcArray.slice(0, srcArray.length - i), fast_length)
                : ema(srcArray.slice(0, srcArray.length - i), fast_length)
        )
        slow_maArray.push(
            sma_source == "SMA" ?
                sma(srcArray.slice(0, srcArray.length - i), slow_length)
                : ema(srcArray.slice(0, srcArray.length - i), slow_length)
        )
        macdArray.push(fast_maArray[i] - slow_maArray[i])


    }

    slow_maArray.reverse()
    fast_maArray.reverse()
    macdArray.reverse()


    let signal = sma_signal == "SMA" ? sma(macdArray, signal_length) : ema(macdArray, signal_length)

    let hist = macdArray[macdArray.length - 1] - signal

    let signal_prev = sma_signal == "SMA" ? sma(macdArray.slice(0, macdArray.length - 1), signal_length) : ema(macdArray.slice(0, macdArray.length - 1), signal_length)

    let hist_prev = macdArray[macdArray.length - 2] - signal_prev

    // console.log(`${hist} , ${macdArray[macdArray.length-1]} , ${signal}`)

    let color = (hist >= 0 ? (hist_prev < hist ? col_grow_above : col_fall_above) : (hist_prev < hist ? col_grow_below : col_fall_below))

    // console.log(color)
    // console.log(fast_maArray[fast_maArray.length-1])
    // console.log(slow_maArray[slow_maArray.length-1])
    // console.log(macdArray[macdArray.length])
    // hline(0, "Zero Line", color=color.new(#787B86, 50))
    // plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below)))
    // plot(macd, title="MACD", color=col_macd)
    // plot(signal, title="Signal", color=col_signal)

    let result = 'short'

    if (color === 'green') {
        result = 'long'
    } else if (color === 'red') {
        result = 'short'
    }



    return result
}




const sma = (array, length) => {
    let _sma = 0
    for (let i = 0; i < length; i++) {
        _sma += Number(array[array.length - 1 - i])
    }
    return _sma / length
}

const ema = (array, length) => {

    let alpha = 2 / (length + 1)
    let _emaArray = []
    _emaArray[0] = Number(array[0])
    for (let i = 1; i < array.length; i++) {
        _emaArray.push(alpha * Number(array[i]) + (1 - alpha) * _emaArray[i - 1])
    }
    return _emaArray[_emaArray.length - 1]
}

export default macd;


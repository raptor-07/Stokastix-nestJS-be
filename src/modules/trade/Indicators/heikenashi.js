const { toTime } = require("./timeconverter")

exports.heikinashi = (candleData) => {

    let haOpenArray = [], hacloseArray = []

    haOpenArray[0] = (Number(candleData[0][1]) + Number(candleData[0][4])) / 2
    hacloseArray[0] = (Number(candleData[0][1]) + Number(candleData[0][2]) + Number(candleData[0][3]) + Number(candleData[0][4])) / 4



    for (let i = 1; i < candleData.length; i++) {
        haOpenArray.push((haOpenArray[i - 1] + hacloseArray[i - 1]) / 2)
        hacloseArray.push((Number(candleData[i][1]) + Number(candleData[i][2]) + Number(candleData[i][3]) + Number(candleData[i][4])) / 4)
    }
    // const lastCandle = candleData[candleData.length-1]
    // var open = lastCandle[1]
    // var high = lastCandle[2]
    // var low = lastCandle[3]
    // var close = lastCandle[4]
    // const secondLastCandle = candleData[candleData.length-2]
    // var secondLastOpen = secondLastCandle[1]
    // var secondLastHigh = secondLastCandle[2]
    // var secondLastLow = secondLastCandle[3]
    // var secondLastClose = secondLastCandle[4]
    // const thirdLastCandle = candleData[candleData.length-3]
    // var thirdLastOpen = thirdLastCandle[1]
    // var thirdLastHigh = thirdLastCandle[2]
    // var thirdLastLow = thirdLastCandle[3]
    // var thirdLastClose = thirdLastCandle[4]
    // const fourthLastCandle = candleData[candleData.length-4]
    // var fourthLastOpen = fourthLastCandle[1]
    // var fourthLastHigh = fourthLastCandle[2]
    // var fourthLastLow = fourthLastCandle[3]
    // var fourthLastClose = fourthLastCandle[4]

    // // Calculation HA Values
    // var secondPrevHaopen = (fourthLastOpen+fourthLastClose) / 2
    // var secondPrevHaclose = (thirdLastOpen+thirdLastHigh+thirdLastLow+thirdLastClose)/4
    // var prevHaopen = (secondPrevHaopen+secondPrevHaclose) / 2
    // var prevHaclose = (secondLastOpen+secondLastHigh+secondLastLow+secondLastClose)/4
    // var haopen   =  
    // // (secondLastOpen+secondLastClose)/2
    // (prevHaopen + prevHaclose) / 2
    // var haclose  = ((open + high + low + close)/4)
    // var hahigh   = Math.max(high, Math.max(haopen, haclose))
    // var halow    = Math.min(low,  Math.min(haopen, haclose))

    let haopen = haOpenArray[haOpenArray.length - 1]
    let haclose = hacloseArray[hacloseArray.length - 1]
    let prevHaopen = haOpenArray[haOpenArray.length - 2]
    let prevHaclose = hacloseArray[hacloseArray.length - 2]

    // console.log(haOpenArray)
    // console.log(hacloseArray)
    //Uncomment below to test Accuracy of Heikinashi output
    // console.log(toTime(candleData[candleData.length-1][0]))
    // console.log(haopen)
    // console.log(haclose)
    // console.log(toTime(candleData[candleData.length-2][0]))
    // console.log(prevHaopen)
    // console.log(prevHaclose)
    // console.log(toTime(candleData[candleData.length-3][0]))
    // console.log(haOpenArray[haOpenArray.length-3])
    // console.log(hacloseArray[hacloseArray.length-3])


    // HA colors
    var hacolor = haclose > haopen ? "green" : "red"

    // Signals
    var turnGreen = haclose > haopen &&
        // secondLastClose <= secondLastOpen
        prevHaclose <= prevHaopen
    var turnRed = haclose <= haopen &&
        // secondLastClose > secondLastOpen
        prevHaclose > prevHaopen
    // console.log(toTime(candleData[candleData.length-1][0]))
    // console.log("Heikinashi Color :" + hacolor)
    // console.log(`TurnGreen : ${turnGreen}`)
    // console.log(`TurnRed : ${turnRed}`)
    return { color: hacolor, turnGreen: turnGreen, turnRed: turnRed }
}


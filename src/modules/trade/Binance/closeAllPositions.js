import getCurrentPosition from './getCurrentPosition';
import placeNewMktOrder from './placeNewMktOrder';
const axios = require("axios");
const crypto = require("crypto");

// Binance Testnet
const baseUrl = "https://testnet.binancefuture.com";
const API_KEY = process.env.API_KEY_TEST
const API_SECRET = process.env.API_SECRET_TEST

const closeAllPositions = async (symbol) => {
    let currentPosition = await getCurrentPosition(symbol)
    if (currentPosition === "error") {
        console.log(`Missed Current Postion Data`);
        return "error";
    }
    if (Number(currentPosition[0].positionAmt) === 0) {
        return "success"
    } else {
        await placeNewMktOrder(
            symbol,
            Number(currentPosition[0].positionAmt) > 0 ? 'SELL' : 'BUY',
            'MARKET',
            Math.abs(Number(currentPosition[0].positionAmt)))
        currentPosition = await getCurrentPosition(symbol)
        if (Number(currentPosition[0].positionAmt) === 0) {
            return "success"
        } else {
            return "error"
        }
    }

}

exports.closeAllPositions = closeAllPositions;
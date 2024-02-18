import dotenv from 'dotenv';
dotenv.config();
const axios = require("axios");
const crypto = require("crypto");

// Binance Testnet
const baseUrl = "https://testnet.binancefuture.com";
const API_KEY = process.env.API_KEY_TEST
const API_SECRET = process.env.API_SECRET_TEST

const placeNewBatchOrder = async (
    symbol,
    side,
    type,
    quantity,
    stopSide,
    stopType,
    stopPrice
) => {
    let timestamp = Date.now();

    let to_sign = `batchOrders='['{symbol=BTCUSD&side=BUY&type=MARKET&quantity=0.001&recvWindow=60000},{symbol=BTCUSD&side=SELL&type=STOP_MARKET&stopPrice=15500&recvWindow=60000}]&timestamp=${timestamp}`;

    const hmac = crypto
        .createHmac("sha256", API_SECRET)
        .update(to_sign)
        .digest("hex");

    var config = {
        method: "post",
        url: `${baseUrl}/fapi/v1/batchorder?${to_sign}&signature=${hmac}`,
        headers: {
            "X-MBX-APIKEY": `${API_KEY}`,
            "Content-Type": "application/json",
        },
    };

    axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error)
            return error.message;
        });
};

export default placeNewBatchOrder;
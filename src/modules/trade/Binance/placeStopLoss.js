import dotenv from 'dotenv';
dotenv.config();
const axios = require("axios");
const crypto = require("crypto");

// Binance Testnet
const baseUrl = "https://testnet.binancefuture.com";
const API_KEY = process.env.API_KEY_TEST
const API_SECRET = process.env.API_SECRET_TEST

const placeStopLoss = async (symbol, side, type, stopPrice) => {
    let timestamp = Date.now();

    let to_sign = `symbol=${symbol}&side=${side}&type=${type}&stopPrice=${stopPrice}&recvWindow=60000&closePosition=true&timestamp=${timestamp}`;

    const hmac = crypto
        .createHmac("sha256", API_SECRET)
        .update(to_sign)
        .digest("hex");

    var config = {
        method: "post",
        url: `${baseUrl}/fapi/v1/order?${to_sign}&signature=${hmac}`,
        headers: {
            "X-MBX-APIKEY": `${API_KEY}`,
            "Content-Type": "application/json",
        },
    };

    let result = await axios(config)
        .then(function (response) {
            return response.data.clientOrderId
            // .orderId
        })
        .catch(function (error) {
            console.log(error)
            return "error";
        });
    console.log(result)
    return result
};

export default placeStopLoss;
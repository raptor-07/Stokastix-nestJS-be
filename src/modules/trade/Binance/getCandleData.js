import dotenv from 'dotenv';
dotenv.config();
const axios = require("axios");

// Binance Testnet
const baseUrl = "https://testnet.binancefuture.com";
const API_KEY = process.env.API_KEY_TEST
const API_SECRET = process.env.API_SECRET_TEST

const getCandleData = async (symbol, interval, limit) => {
    var config = {
        method: "get",
        url: `${baseUrl}/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
        headers: {},
    };

    let result = await axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error)
            return "error";
        });

    return result
};

export default getCandleData;
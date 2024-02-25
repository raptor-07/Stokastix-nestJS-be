const axios = require("axios");
const crypto = require("crypto");

// Binance Testnet
const baseUrl = "https://testnet.binancefuture.com";
const API_KEY = process.env.API_KEY_TEST
const API_SECRET = process.env.API_SECRET_TEST

const getTickerPrice = async (symbol) => {
    var config = {
        method: "get",
        url: `${baseUrl}/fapi/v1/ticker/price?symbol=${symbol}`,
        headers: {},
    };

    let result = await axios(config)
        .then(function (response) {
            return (response.data);
        })
        .catch(function (error) {
            console.log(error)
            return "error";
        });
    return result
};

export default getTickerPrice;
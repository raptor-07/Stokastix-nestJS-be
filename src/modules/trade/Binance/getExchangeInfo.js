const axios = require("axios");
const crypto = require("crypto");

// Binance Testnet
const baseUrl = "https://testnet.binancefuture.com";
const API_KEY = process.env.API_KEY_TEST
const API_SECRET = process.env.API_SECRET_TEST

const getExchangeInfo = async (symbol) => {
    var config = {
        method: "get",
        url: `${baseUrl}/fapi/v1/exchangeInfo`,
        headers: {},
    };
    let result =
        await axios(config)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                console.log(error)
                return error.message;
            });

    result.symbols.forEach((market) => {
        if (market.symbol === symbol) {
            console.log(market.filters)
            console.log(market.orderTypes)
            console.log(market.timeInForce)
        }
    })
};

export default getExchangeInfo;
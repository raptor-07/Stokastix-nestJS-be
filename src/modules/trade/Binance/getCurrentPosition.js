import dotenv from 'dotenv';
dotenv.config();
const axios = require("axios");
const crypto = require("crypto");

// Binance Testnet
const baseUrl = "https://testnet.binancefuture.com";
const API_KEY = process.env.API_KEY_TEST
const API_SECRET = process.env.API_SECRET_TEST

const getCurrentPosition = async (symbol) => {
    let timestamp = Date.now();

    const to_sign = `symbol=${symbol}&recvWindow=60000&timestamp=${timestamp}`;

    const hmac = crypto
        .createHmac("sha256", API_SECRET)
        .update(to_sign)
        .digest("hex");

    var config = {
        method: "get",
        url: `${baseUrl}/fapi/v2/positionRisk?${to_sign}&signature=${hmac}`,
        headers: {
            "X-MBX-APIKEY": `${API_KEY}`,
            "Content-Type": "application/json",
        },
    };

    var result = await axios(config)
        .then(function (response) {
            return (response.data);
        })
        .catch(function (error) {
            console.log(error)
            return 'error';
        });
    // console.log(result)
    return result
};

export default getCurrentPosition;
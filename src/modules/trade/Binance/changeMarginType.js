const axios = require("axios");
const crypto = require("crypto");

// Binance Testnet
const baseUrl = "https://testnet.binancefuture.com";
const API_KEY = process.env.API_KEY_TEST
const API_SECRET = process.env.API_SECRET_TEST

const changeMarginType = async (symbol, marginType) => {
    let timestamp = Date.now();

    let to_sign = `symbol=${symbol}&marginType=${marginType}&recvWindow=60000&timestamp=${timestamp}`;

    const hmac = crypto
        .createHmac("sha256", API_SECRET)
        .update(to_sign)
        .digest("hex");

    var config = {
        method: "post",
        url: `${baseUrl}/fapi/v1/marginType?${to_sign}&signature=${hmac}`,
        headers: {
            "X-MBX-APIKEY": `${API_KEY}`,
            "Content-Type": "application/json",
        },
    };

    let result = await axios(config)
        .then(function (response) {
            console.log(response.data)
            return (response.data);
        })
        .catch(function (error) {
            console.log(error)
            return error.message;
        });
};

export default changeMarginType;
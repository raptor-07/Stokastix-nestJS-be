import dotenv from 'dotenv';
dotenv.config();
import getOpenOrders from './getOpenOrders';
import cancelOrder from './cancelOrder';

// Binance Testnet
const baseUrl = "https://testnet.binancefuture.com";
const API_KEY = process.env.API_KEY_TEST
const API_SECRET = process.env.API_SECRET_TEST

const closeAllOpenOrders = async (symbol) => {
    let existingSLOrder = await getOpenOrders(symbol)
    if (existingSLOrder === "error") {
        console.log(`Data Error in SL Fetching`);
        return "error";
    }

    if (!existingSLOrder.length) {
        return "success"
    } else {

        for (let i = 0; i < existingSLOrder.length; i++) {
            await cancelOrder(symbol, existingSLOrder[i].clientOrderId)
        }

        existingSLOrder = await getOpenOrders(symbol)
        if (!existingSLOrder.length) {
            return "success"
        } else {
            return "error"
        }
    }

}

export default closeAllOpenOrders;
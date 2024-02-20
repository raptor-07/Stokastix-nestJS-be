import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const baseUrl: string = 'https://testnet.binancefuture.com';
const API_KEY: string | undefined = process.env.API_KEY_TEST;
const API_SECRET: string | undefined = process.env.API_SECRET_TEST;

const getCandleData = async (
  symbol: string,
  interval: string,
  limit: number,
): Promise<any> => {
  const config = {
    method: 'get',
    url: `${baseUrl}/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
    headers: {},
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};

export default getCandleData;

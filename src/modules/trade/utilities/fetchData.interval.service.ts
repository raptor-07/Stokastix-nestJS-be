import { Injectable } from '@nestjs/common';
import { ConfigDto } from '../dto/trade.configDto';
import { FetchIntervalState } from '../dto/trade.fetchIntervalStateDto';
import { decideFetchIntervals } from './decideFetchIntervals';
import getCandleData from '../Binance/getCandleData';

@Injectable()
export class FetchDataIntervalService {
  private fetchIntervalState:FetchIntervalState = {
    _3m: true,
    _15m: false,
    _30m: false,
    _1h: false,
    _4h: false,
    _8h: false,
    _1d: false,
  };

  public startIntervals(userData: ConfigDto) {
    this.fetchIntervalState = decideFetchIntervals(userData, this.fetchIntervalState);

    for (const key in this.fetchIntervalState) {
      if (this.fetchIntervalState[key]) {
        const interval = this.convertToMilliseconds(key);
        setInterval(() => this.handleIntervalFetch(key, userData), interval);
      }
    }
  }

  private convertToMilliseconds(key: string): number {
    const time = parseInt(key.slice(1), 10);
    const unit = key[0];

    switch (unit) {
      case 'm':
        return time * 60 * 1000;
      case 'h':
        return time * 60 * 60 * 1000;
      case 'd':
        return time * 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  }

  private async handleIntervalFetch(key: string, userData: ConfigDto) {
    //to be continued:
    // 1. Create a global state to store this data
    // 2. Add error handling to handle failures at this point
    // await getCandleData(userData.asset, key.slice(1), 31);
    console.log(`Fetching ${key} data`);
  }
}

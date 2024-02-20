import { Controller } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Post, UseGuards, Body } from '@nestjs/common';
import { config } from 'dotenv';
config();
import { FetchDataIntervalService } from './utilities/fetchData.interval.service';
import { ConfigDto } from './dto/trade.configDto';

@Controller('trade')
export class TradeController {
  constructor(private fetchDataIntervalService: FetchDataIntervalService) {}

  @UseGuards(AuthGuard)
  @Post('start-bot')
  async startBot(@Body() userData: ConfigDto) {
    //start the interval service to fetch candle data
    this.fetchDataIntervalService.startIntervals(userData);

    //Continue ToDo:
    //Data has been fetched, logic has to start from here
    return 'Bot started successfully';
  }
}

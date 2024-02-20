import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { AuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';
import { FetchDataIntervalService } from './utilities/fetchData.interval.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigDto } from './dto/trade.configDto';

@Module({
  imports: [AuthModule, ScheduleModule.forRoot(), ConfigDto],
  controllers: [TradeController],
  providers: [AuthGuard, FetchDataIntervalService],
})
export class TradeModule {}

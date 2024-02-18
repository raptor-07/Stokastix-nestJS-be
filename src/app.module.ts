import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DbModule } from './modules/db/db.module';
import { TradeModule } from './modules/trade/trade.module';

@Module({
  imports: [AuthModule, DbModule, TradeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

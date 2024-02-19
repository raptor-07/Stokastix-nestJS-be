import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { AuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TradeController],
  providers: [AuthGuard],
})
export class TradeModule {}

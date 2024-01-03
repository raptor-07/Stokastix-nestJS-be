import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../db/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthModule {}

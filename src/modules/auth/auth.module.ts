import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../db/users/user.module';
import { HashService } from './hash/hash.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [HashService, JwtService],
  exports: [HashService, JwtService],
})
export class AuthModule {}

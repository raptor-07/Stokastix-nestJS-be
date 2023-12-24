import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import config from './ormconfig';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  providers: [UserService],
})
export class DbModule {}

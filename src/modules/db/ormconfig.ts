import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: process.env.USER_ROLE,
  password: process.env.USER_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: true,
};

export default config;

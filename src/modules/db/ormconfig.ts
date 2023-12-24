import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';

dotenvConfig();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: process.env.USER_ROLE,
  password: process.env.USER_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [path.join(__dirname, 'entities', '*.entity{.ts,.js}')],
  synchronize: true,
};

export default config;

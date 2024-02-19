"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var config = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: process.env.USER_ROLE,
    password: process.env.USER_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
};
exports.default = config;

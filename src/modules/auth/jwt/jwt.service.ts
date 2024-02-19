import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

@Injectable()
export class JwtService {
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

  async generateToken(payload: any) {
    return await jwt.sign(payload, this.JWT_SECRET_KEY, {
      expiresIn: this.JWT_EXPIRATION_TIME,
    });
  }

  async verifyToken(token: string) {
    console.log(await jwt.verify(token, this.JWT_SECRET_KEY, "firsttt"));
    return await jwt.verify(token, this.JWT_SECRET_KEY);
  }
}

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

@Injectable()
export class JwtService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  private readonly JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

  generateToken(payload: any) {
    return jwt.sign(payload, this.JWT_SECRET_KEY, {
      expiresIn: this.JWT_EXPIRATION_TIME,
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.JWT_SECRET_KEY);
  }
}

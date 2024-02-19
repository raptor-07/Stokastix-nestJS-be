import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    try {
      //if promise is resolved return token, if promise is rejected return 401
      await this.jwtService.verifyToken(token);
      return true;
    } catch (e) {
      request.res.status(401).json({ message: 'Unauthorized' });
      return false;
    }
  }
}

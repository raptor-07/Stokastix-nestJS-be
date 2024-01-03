import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/auth.signupDto';
import { SigninDto } from './dto/auth.signinDto';
import { UserService } from '../db/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async create(@Body() userData: SignupDto): Promise<string> {
    console.log(userData);
    await this.userService.createUser(
      userData.username,
      userData.password,
      userData.order_hashkey,
    );
    return 'Account made Successfully!';
  }

  @Post('signin')
  login(@Body() userData: SigninDto): string {
    console.log(userData);
    return 'Data received successfully!';
  }
}

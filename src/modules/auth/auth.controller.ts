import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/auth.signupDto';
import { SigninDto } from './dto/auth.signinDto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  create(@Body() userData: SignupDto): string {
    console.log(userData);
    return 'Data received successfully!';
  }

  @Post('signin')
  login(@Body() userData: SigninDto): string {
    console.log(userData);
    return 'Data received successfully!';
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

// validation
class SignupDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  apikey: string;
}

class SigninDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  @Post('signup')
  create(@Body() signupDto: SignupDto): string {
    console.log(signupDto);
    return 'Data received successfully!';
  }

  @Post('signin')
  login(@Body() signinDto: SigninDto): string {
    console.log(signinDto);
    return 'Data received successfully!';
  }
}

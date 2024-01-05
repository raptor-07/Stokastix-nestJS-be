import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/auth.signupDto';
import { SigninDto } from './dto/auth.signinDto';
import { UserService } from '../db/users/user.service';
import { HashService } from './hash/hash.service';
import { JwtService } from './jwt/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async create(@Body() userData: SignupDto): Promise<string> {
    console.log(userData);
    const hashedPassword = await this.hashService.hashPassword(
      userData.password,
    );

    await this.userService.createUser(
      userData.username,
      userData.password,
      hashedPassword,
    );
    return 'Account made Successfully!';
  }

  @Post('signin')
  async login(@Body() userData: SigninDto): Promise<string> {
    if (!userData.username || !userData.password) {
      return 'Missing username or password';
    }

    const user = await this.userService.findOne(
      userData.username,
      userData.password,
    );

    if (!user) {
      return 'User not found, please check your username and password';
    }

    if (
      !(await this.hashService.comparePassword(
        userData.password,
        user.password,
      ))
    ) {
      return 'Password is incorrect';
    }

    if (
      await this.hashService.comparePassword(userData.password, user.password)
    ) {
      const token = this.jwtService.generateToken({
        username: user.username,
      });
      return token;
    }
  }
}

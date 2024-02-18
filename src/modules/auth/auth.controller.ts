import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/auth.signupDto';
import { SigninDto } from './dto/auth.signinDto';
import { updateDto } from './dto/auth.updateDto';
import { UserService } from '../db/users/user.service';
import { HashService } from './hash/hash.service';
import { JwtService } from './jwt/jwt.service';

interface SignupResponse {
  result: boolean;
  description: string;
}

interface SigninResponse {
  result: boolean;
  token: string;
  description: string;
}

interface Verify {
  result: boolean;
}

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async create(@Body() userData: SignupDto): Promise<SignupResponse> {
    let response: SignupResponse;

    const hashedPassword = await this.hashService.hashPassword(
      userData.password,
    );

    const user = await this.userService.findOne(userData.username);

    if (user) {
      response = {
        result: false,
        description: 'username is taken',
      };
      return response;
    }

    try {
      response = {
        result: true,
        description: 'Account created successfully. Login to continue',
      };
      await this.userService.createUser(
        userData.username,
        userData.email,
        hashedPassword,
        userData.BNCOrderKey,
        userData.BNCAPIKey,
      );
      return response;
    } catch {
      response = {
        result: false,
        description: 'Error creating account. Try again later!',
      };
      return response;
    }
  }

  @Post('signin')
  async login(@Body() userData: SigninDto): Promise<SigninResponse> {
    let response: SigninResponse;

    const user = await this.userService.findOne(userData.username);

    if (!user) {
      response = {
        result: false,
        token: '',
        description: 'User not found, please check your username and password',
      };

      return response;
    }

    if (
      await this.hashService.comparePassword(userData.password, user.password)
    ) {
      const token = await this.jwtService.generateToken({
        username: user.username,
      });

      response = {
        result: true,
        token: token,
        description: 'Logged in successfully',
      };

      return response;
    } else {
      response = {
        result: false,
        token: '',
        description: 'Password or username is incorrect',
      };

      return response;
    }
  }

  @Post('update-keys')
  async update(@Body() userData: updateDto): Promise<string> {
    const user = await this.userService.findOne(userData.username);

    if (!user) {
      return 'User not found, please check your username and password';
    }

    if (
      await this.hashService.comparePassword(userData.password, user.password)
    ) {
      await this.userService.updateUserKeys(
        userData.username,
        userData.order_hashkey,
        userData.binance_api_key,
      );
      return 'Keys updated Successfully!';
    } else {
      return 'Password is incorrect';
    }
  }

  @Post('/verify-login')
  async JWTverify(@Body() data: any): Promise<Verify> {
    // console.log(data);
    
    let verify: Verify;

    try {
      if (await this.jwtService.verifyToken(data.token)) {
        verify = {
          result: true,
        };

        return verify;
      } else {
        verify = {
          result: false,
        };

        return verify;
      }
    } catch {
      verify = {
        result: false,
      };

      return verify;
    }
  }
}

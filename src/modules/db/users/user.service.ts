import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    username: string,
    email: string,
    password: string,
    order_hashkey: string,
    binance_api_key: string,
  ): Promise<User> {
    const user = this.userRepository.create({
      username,
      email,
      password,
      order_hashkey,
      binance_api_key,
    });

    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });

      if (user) {
        return user;
      }

      return undefined;
    } catch (error) {
      console.error('Error finding user:', error.message);
    }
  }

  async updateUserKeys(
    username: string,
    order_hashkey: string,
    binance_api_key: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    user.order_hashkey = order_hashkey;
    user.binance_api_key = binance_api_key;

    return this.userRepository.save(user);
  }
}

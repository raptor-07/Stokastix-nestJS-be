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
    password: string,
    order_hashkey: string,
  ): Promise<User> {
    const user = this.userRepository.create({
      username,
      password,
      order_hashkey,
    });
    return this.userRepository.save(user);
  }

  async findOne(username: string, password: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });

      if (user && user.password === password) {
        return user;
      }

      return undefined;
    } catch (error) {
      console.error('Error finding user:', error.message);
      throw new Error('Failed to find user: password is incorrect');
    }
  }
}

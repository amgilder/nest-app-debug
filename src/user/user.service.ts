import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // Inject userRepository generated in app.module.ts
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createUser(body: any): Promise<void> {
    const user = new User();
    user.email = body.email;
    user.name = body.email.split('@')[0];
    user.handle = user.name;
    await this.userRepository.save(user);
  }
}

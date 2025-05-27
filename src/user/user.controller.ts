import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GenericResponse } from 'src/shared';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  // Inject userService
  constructor(
    private userService: UserService
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() body: CreateUser): Promise<GenericResponse> {
    await this.userService.createUser(body);
    return new GenericResponse('Please check your email inbox.');
  }
}

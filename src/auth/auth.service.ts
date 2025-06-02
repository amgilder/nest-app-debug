import { Injectable } from '@nestjs/common';
import { AuthRequest } from './dto/auth-request.dto';
import { UserService } from 'src/user/user.service';
import { AuthUser } from './dto/auth-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { generateUniqueValue } from 'src/shared';
import { response } from 'express';
import { LoginUser } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(Token) private tokenRepository: Repository<Token>
  ) {}

  async handleAuth(
    request: AuthRequest
  ): Promise<{ user: AuthUser, token: string }> {
    // const { id, name, email, handle, image } = 
    const user = 
      await this.userService.validateToken(request.operation, request.token);
    const token = new Token();
    token.user = user;
    token.token = generateUniqueValue();
    const { id, name, email, handle, image } = user;
    await this.tokenRepository.save(token);
    return {
      user: { id, name, email, handle, image },
      token: token.token,
    };
  }

  async deleteToken(token: string | null) {
    if (token) {
      await this.tokenRepository.delete({token});
    }
  }

  async handleLogin(request: LoginUser): Promise<void> {
    await this.userService.generateLoginToken(request.email);
  }
}

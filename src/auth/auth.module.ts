import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { AuthUserMiddleware } from './auth-user.middleware';

@Module({
  // imports: [UserModule, TypeOrmModule.forFeature([Token])],
  // Need to avoid circular references using forwardRef(), doing the same in UserModule
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Token])],
  controllers: [AuthController],
  providers: [AuthService, AuthUserMiddleware],
  exports: [AuthService],
})
export class AuthModule {}

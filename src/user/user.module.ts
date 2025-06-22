import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EmailModule } from 'src/email/email.module';
import { UniqueEmail } from './validator/unique-email.validator';
import { AuthUserMiddleware } from 'src/auth/auth-user.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [
    UserService,
    UniqueEmail,
  ],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]), 
    EmailModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Add name to wildcard to avoid migration issues to Express v5
    consumer.apply(AuthUserMiddleware).forRoutes({ path: 'users/*id', method: RequestMethod.PUT});
  }
}

import { Module } from '@nestjs/common';
// import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
// import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './app-db.sqlite',
      synchronize: true,  // NOT FOR PRODUCTION, DEV ONLY!!!
      entities: [User],
    }),
    // TypeOrmModule.forFeature([User]),
    UserModule,  // Gen User repository
  ],
  // controllers: [UserController],  // Moved to User Module
  // providers: [UserService],       // Moved to User Module
  controllers: [],
  providers: [],

})
export class AppModule {}

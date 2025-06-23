import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthUserMiddleware } from 'src/auth/auth-user.middleware';
import { ReactionModule } from '../reaction/reaction.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [TypeOrmModule.forFeature([Article]), AuthModule, ReactionModule],
})
export class ArticleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Add name to wildcard to avoid migration issues to Express v5
    consumer.apply(AuthUserMiddleware).forRoutes('articles', 'users/*idOrHandle/articles');
  }
}

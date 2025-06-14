import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleRequest } from './dto/article-request.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/user.entity';
import { Pagination } from 'src/shared';
import { Page } from 'src/shared/pagination/pagination.decorator';
import { ArticleWithContent } from './dto/article-response.dto';

// @Controller('articles')
@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('articles')
  @UseGuards(AuthGuard)
  async createArticle(
    @Body() body: ArticleRequest, 
    @CurrentUser() user: User
  ): Promise<{ id: number }> {
    return this.articleService.save(body, user);
  }

  @Put('articles/:id')
  @UseGuards(AuthGuard)
  async updateArticle(
    @Body() body: ArticleRequest, 
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<{ id: number }> {
    return this.articleService.update(id, body, user);
  }

  @Patch('articles/:id/publish')
  @UseGuards(AuthGuard)
  async publishArticle(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<{ published: boolean }> {
    return this.articleService.publish(id, user);
  }

  @Get('articles')
  async getArticles(@Page() page: Pagination) {
    return this.articleService.getArticles(page);
  }

  @Get('articles/:idOrSlug')
  async getArticleByIdOrSlug(
    @CurrentUser() user: User,
    @Param('idOrSlug') idOrSlug: string
  ): Promise<ArticleWithContent> {
    return this.articleService.getArticleByIdOrSlug(idOrSlug, user);
  }

  @Get('users/:idOrHandle/articles')
  async getArticlesOfUser(
    @Page() page: Pagination,
    @CurrentUser() user: User,
    @Param('idOrHandle') idOrHandle: string
  ) {
    return this.articleService.getArticlesOfUser(page, idOrHandle, user);
  }
}

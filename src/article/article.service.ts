import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRequest } from './dto/article-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { generateUniqueValue } from 'src/shared';
import { User } from 'src/user/user.entity';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private articleRepository: Repository<Article>) {}

  async save(value: ArticleRequest, user: User): Promise<{ id: number }> {
    const article = new Article();
    article.title = value.title;
    article.content = value.content;
    article.image = value.image;
    article.slug = encodeURIComponent(
      value.title.toLocaleLowerCase().replaceAll(' ', '-')
    ) + '-' + generateUniqueValue(true);

    article.user = user;
    await this.articleRepository.save(article);
    return { id: article.id };
  }

  async update(id: number, value: ArticleRequest, user: User): Promise<{ id: number }> {
    const articleInDB = await this.getArticle(id, user);
    articleInDB.title = value.title;
    articleInDB.content = value.content;
    articleInDB.image = value.image;
    await this.articleRepository.save(articleInDB);
    return { id };
  }

  async publish(id: number, user: User): Promise<{ published: boolean }> {
    const articleInDB = await this.getArticle(id, user);
    articleInDB.published = !articleInDB.published;
    articleInDB.published_at = articleInDB.published ? new Date() : null;
    await this.articleRepository.save(articleInDB);
    return { published: articleInDB.published };
  }

  private async getArticle(id: number, user: User): Promise<Article> {
    const articleInDB = await this.articleRepository.findOne({ 
      where: { id },
      loadRelationIds: { disableMixedMap: true },  // Just need ids, not whole user objs
    });
    if (!articleInDB) {
      throw new NotFoundException(); // Make sure we're updating an existing article
    }
    if (articleInDB.user.id !== user.id) {
      throw new ForbiddenException(); // Make sure article belongs to current user
    }
    return articleInDB;
  }
}

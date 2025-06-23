import { User } from "src/user/user.entity";
import { Article } from "../article.entity";
import { Reactions } from "../../shared";

export class Author {
  id: number;
  name: string;
  handle: string;
  image: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.handle = user.handle;
    this.image = user.image;
  }
}

export class ShortArticle {
  id: number;
  title: string;
  slug: string;
  image: string;
  published: boolean;
  publishedAt: Date;
  author: Author;
  reactions: Reactions;

  constructor(article: Article, reactions: Reactions) {
    this.id = article.id;
    this.title = article.title;
    this.slug = article.slug;
    this.image = article.image;
    this.published = article.published;
    this.publishedAt = article.published_at;
    this.author = new Author(article.user);
    this.reactions = reactions;
  }
}

export class ArticleWithContent extends ShortArticle {
  content: string;

  constructor(article: Article, reactions: Reactions) {
    super(article, reactions);
    this.content = article.content;
  }
}
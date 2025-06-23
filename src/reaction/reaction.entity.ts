import { Article } from "../article/article.entity";
import { Category } from "../shared";
import { User } from "../user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reactions' })
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: Category;

  @ManyToOne(() => User, (user) => user.reactions)
  user: User;

  @ManyToOne(() => Article, (article) => article.reactions)
  article: Article;
}
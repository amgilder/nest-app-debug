import { Reaction } from "../reaction/reaction.entity";
import { Article } from "../article/article.entity";
import { Token } from "../auth/token.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  handle: string;

  @Column()
  email: string;

  @Column({ 
    type: String,
    nullable: true 
  })
  image: string | null;

  @Column({ 
    type: String,
    nullable: true 
  })
  registrationToken: string | null;

  @Column({ 
    type: String,
    nullable: true 
  })
  loginToken: string | null;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions: Reaction[];
}
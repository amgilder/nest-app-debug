import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import * as path from 'path';
import { User } from "../src/user/user.entity";
import { Token } from "../src/auth/token.entity";
import { Article } from "../src/article/article.entity";
import { Reaction } from "../src/reaction/reaction.entity";

const envFile = process.env.NODE_ENV === 'development' ? '.dev.env' : '.env';

dotenv.config({
  path: path.resolve(
    __dirname,
    '..',
    envFile,
  )
});

export default new DataSource({
  type: 'sqlite',
  database: String(process.env.DB_HOST),
  migrations: ['./database/migrations/*.ts'],
  // entities: [__dirname + '/../**/*.entity.ts'],
  entities: [User, Token, Article, Reaction],
  logging: true,
});
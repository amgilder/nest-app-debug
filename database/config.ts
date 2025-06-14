import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import * as path from 'path';

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
  // entities: [
  //   __dirname + '/../src/article/article.entity.ts',
  //   __dirname + '/../src/auth/token.entity.ts',
  //   __dirname + '/../src/user/user.entity.ts',
  // ],
  logging: true,
});
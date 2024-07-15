require('dotenv').config();
import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Category } from './entities/category.entity';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Book } from './entities/book.entity';

import { checkCartsUnique } from './migrations/triggers/checkCartsUnique';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  // url: process.env.POSTGRES_URL,
  host: process.env.POSTGRES_HOST || process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER || process.env.DB_USERNAME,
  password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
  database: process.env.POSTGRES_DATABASE || process.env.DB_DATABASE,
   // requestTimeout: 60000,
  // entities: ['entities/**/*.entity{.ts,.js}', 'entities/**/*.schema{.ts,.js}'],
  entities: [
    Category, 
    Post, 
    User, 
    Book
  ],
  extra: {
    ssl: {
      rejectUnauthorized: false, // Không kiểm tra chứng chỉ
    },
    statement_timeout: 60000, // Thời gian chờ 60 giây
  },
  synchronize: false,
  logging: true,
  dropSchema: false,
});

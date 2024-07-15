"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require('dotenv').config();
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const user_entity_1 = require("./entities/user.entity");
const post_entity_1 = require("./entities/post.entity");
const book_entity_1 = require("./entities/book.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    // host: process.env.POSTGRES_HOST || process.env.DB_HOST || 'localhost',
    // port: Number(process.env.DB_PORT),
    // username: process.env.POSTGRES_USER || process.env.DB_USERNAME,
    // password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
    // database: process.env.POSTGRES_DATABASE || process.env.DB_DATABASE,
    // requestTimeout: 60000,
    // entities: ['entities/**/*.entity{.ts,.js}', 'entities/**/*.schema{.ts,.js}'],
    entities: [
        category_entity_1.Category,
        post_entity_1.Post,
        user_entity_1.User,
        book_entity_1.Book
    ],
    extra: {
        ssl: true,
        statement_timeout: 60000, // Thời gian chờ 60 giây
    },
    synchronize: true,
    logging: true,
    dropSchema: true,
});

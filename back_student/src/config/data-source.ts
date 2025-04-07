import 'reflect-metadata';
import {DataSource} from 'typeorm';
import { User } from '../entity/User';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'dev_db',
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
  migrationsRun: true,
  entities: [path.resolve(__dirname, '..', 'entity', '**', '*.ts')],
  //migrations: [__dirname + '/src/migration/**/*.ts'],
  //subscribers: [__dirname + '/src/subscriber/**/*.ts'],
  extra: {
    ssl: process.env.DB_SSL === 'true' ? {rejectUnauthorized: false} : false,
  },
});

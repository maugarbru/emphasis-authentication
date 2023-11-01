import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_NAME } from './env';
import { DataSource } from 'typeorm';
import * as NodeCache from 'node-cache';

import { Usuario } from 'src/core/entitites/usuarios.entity';
import { Orden } from '../entitites/ordenes.entity';

class ConfigService {
  constructor(private DATABASE_NAME: string | undefined) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: 'db/' + this.DATABASE_NAME,
      entities: [Orden, Usuario],
      synchronize: true,
    };
  }
}

export const myCache = new NodeCache();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db/' + DATABASE_NAME,
  entities: [Orden, Usuario],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export const configService = new ConfigService(DATABASE_NAME);

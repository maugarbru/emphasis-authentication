import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_NAME } from './env';

import { Usuario } from 'src/modules/usuarios/usuarios.entity';

class ConfigService {
  constructor(private DATABASE_NAME: string | undefined) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',

      database: 'db/' + this.DATABASE_NAME,
      entities: [Usuario],
      synchronize: true,
    };
  }
}

export const configService = new ConfigService(DATABASE_NAME);

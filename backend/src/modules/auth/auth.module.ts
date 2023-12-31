import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Usuario } from '../../core/entitites/usuarios.entity';
import { Orden } from 'src/core/entitites/ordenes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    TypeOrmModule.forFeature([Orden]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

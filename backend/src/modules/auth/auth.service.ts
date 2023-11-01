import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Usuario } from '../../core/entitites/usuarios.entity';
import { Orden } from 'src/core/entitites/ordenes.entity';
import { mockedOrdenes, mockedUsuarios } from 'src/core/util/mockData';
import { IdentifyUsuarioDto } from '../auth/dto';

import { manejadorAutenticacion } from 'src/core/autenticacion';
import { Solicitud } from 'src/core/autenticacion/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepo: Repository<Usuario>,
    @InjectRepository(Orden)
    private readonly ordenRepo: Repository<Orden>,
  ) {}

  /**
   * Servicio para llenar la base de datos con datos de prueba
   * @returns usuarios y ordenes creadas
   */
  async seedData() {
    await Promise.all([this.userRepo.clear(), this.ordenRepo.clear()]);
    const usersCreated = await Promise.all([
      ...mockedUsuarios.map((u) => this.userRepo.save(u)),
    ]);
    const ordersCreated = await Promise.all([
      ...mockedOrdenes.map((u, index) =>
        this.ordenRepo.save({
          ...u,
          idUsuario: index < 2 ? usersCreated[0].id : 'test',
        }),
      ),
    ]);
    return { usuarios: usersCreated, ordenes: ordersCreated };
  }

  /**
   * Servicio para realizar el flujo de autenticación del usuario
   * @param data Credenciales del usuario
   * @returns Info del usuario y ordenes
   */
  async autenticar(data: IdentifyUsuarioDto): Promise<Solicitud> {
    return await manejadorAutenticacion(data);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Usuario } from '../../core/entitites/usuarios.entity';
import { mockedUsers } from 'src/core/util/mockData';
import { IdentifyUsuarioDto } from '../auth/dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) {}

  async seedData() {
    await Promise.all([this.userRepository.clear()]);
    return await Promise.all([
      ...mockedUsers.map((u) => this.userRepository.save(u)),
    ]);
  }

  async autenticarUsuario(data: IdentifyUsuarioDto): Promise<Usuario> {
    const usuario = await this.userRepository.findOne({
      where: { email: data.email, password: data.password },
    });
    delete usuario?.password;
    return usuario;
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Usuario } from '../usuarios/usuarios.entity';
import { mockedUsers } from 'src/core/util/mockData';

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
}

import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateUsuarioDto, IdentifyUsuarioDto, UpdateUsuarioDto } from './dto';
import { Usuario } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async getAllUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }
  async getOneUsuario(id: string): Promise<Usuario> {
    return await this.usuarioRepository.findOne({
      where: { id },
    });
  }
  async identifyUsuario(data: IdentifyUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: data.email, password: data.password },
    });
    delete usuario?.password;
    return usuario;
  }
  async createOneUsuario(data: CreateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: data.email },
    });
    if (usuario) {
      throw new BadRequestException('Ya existe un USUARIO con ese EMAIL');
    }
    return await this.usuarioRepository.save(data);
  }
  async updateOneUsuario(id: string, data: UpdateUsuarioDto) {
    return await this.usuarioRepository.update({ id }, data);
  }
  async deleteOneUsuario(id: string) {
    return await this.usuarioRepository.delete({ id });
  }
}

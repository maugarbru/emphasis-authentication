import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUsuarioDto, IdentifyUsuarioDto, UpdateUsuarioDto } from './dto';
import { UsuariosService } from './usuarios.service';

import { errorResponse, successResponse } from 'src/core/util';

@Controller('usuarios')
export class UsuariosController {
  constructor(private service: UsuariosService) {}

  @Get()
  async getAllUsuarios() {
    try {
      const usuarios = await this.service.getAllUsuarios();
      return successResponse(usuarios);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get(':id')
  async getOneUsuario(@Param('id') id: string) {
    try {
      const usuario = await this.service.getOneUsuario(id);
      return successResponse(usuario);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post()
  async createOneUsuario(@Body() data: CreateUsuarioDto) {
    try {
      const usuario = await this.service.createOneUsuario(data);
      return successResponse(usuario);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post('login')
  async identifyUsuario(@Body() data: IdentifyUsuarioDto) {
    try {
      const usuario = await this.service.identifyUsuario(data);
      return successResponse(usuario);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Patch(':id')
  async updateOneUsuario(
    @Param('id') id: string,
    @Body() data: UpdateUsuarioDto,
  ) {
    try {
      const usuario = await this.service.updateOneUsuario(id, data);
      return successResponse(usuario);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Delete(':id')
  async deleteOneUsuario(@Param('id') id: string) {
    try {
      const usuario = await this.service.deleteOneUsuario(id);
      return successResponse(usuario);
    } catch (error) {
      return errorResponse(error);
    }
  }
}

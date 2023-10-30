import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IdentifyUsuarioDto } from '../auth/dto';
import { errorResponse, successResponse } from 'src/core/util';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post()
  async seedData() {
    try {
      const data = await this.auth.seedData();
      return successResponse(data);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post('login')
  async identifyUsuario(@Body() data: IdentifyUsuarioDto) {
    try {
      const usuario = await this.auth.autenticarUsuario(data);
      return successResponse(usuario);
    } catch (error) {
      return errorResponse(error);
    }
  }
}

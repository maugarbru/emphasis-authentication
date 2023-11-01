import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IdentifyUsuarioDto } from '../auth/dto';
import { errorResponse, successResponse } from 'src/core/util';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('seed')
  async seedData() {
    try {
      const data = await this.auth.seedData();
      return successResponse(data);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post('login')
  async autenticar(@Body() data: IdentifyUsuarioDto) {
    try {
      const resultado = await this.auth.autenticar(data);
      if (resultado.exito) {
        return successResponse(resultado.datos);
      } else {
        return errorResponse(resultado.error);
      }
    } catch (error) {
      return errorResponse(error);
    }
  }
}

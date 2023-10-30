import { Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

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
}

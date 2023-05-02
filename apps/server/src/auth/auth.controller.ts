import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { LoginRequest, LoginResponse } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({
    status: 201,
    description: 'Returns a Paseto token used for authorization',
    type: LoginResponse,
  })
  public login(@Body() loginData: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginData);
  }
}

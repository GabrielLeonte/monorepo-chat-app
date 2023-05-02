import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { RegisterRequest } from './dto/register.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'Register a new user in the platform',
  })
  public register(@Body() body: RegisterRequest): Promise<void> {
    return this.usersService.register(body);
  }
}

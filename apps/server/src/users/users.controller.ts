import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRequest, RegisterResponse } from './dto/register.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'Register a new user in the platform',
    type: RegisterResponse,
  })
  public register(@Body() body: RegisterRequest) {
    return this.usersService.register(body);
  }
}

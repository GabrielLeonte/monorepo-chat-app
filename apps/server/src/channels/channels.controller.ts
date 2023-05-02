import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Users } from 'src/users/entities/users.entity';

import { AuthGuard } from 'src/auth/auth.guard';

import { CurrentUser } from 'src/decorators/current-user.decorator';

@ApiTags('channels')
@ApiBearerAuth()
@Controller('channels')
@UseGuards(AuthGuard)
export class ChannelsController {
  constructor() {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return a list of channels to which the user has access' })
  getChannels(@CurrentUser() user: Users) {
    return user;
  }
}

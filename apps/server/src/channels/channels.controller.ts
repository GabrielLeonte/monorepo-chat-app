import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Users } from 'src/users/entities/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChannelsService } from './channels.service';

import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GetChannelsResponse } from './dto/channels.dto';

@ApiTags('channels')
@ApiBearerAuth()
@Controller('channels')
@UseGuards(AuthGuard)
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return a list of channels to which the user has access', type: [GetChannelsResponse] })
  getChannels(@CurrentUser() user: Users): Promise<Array<GetChannelsResponse>> {
    return this.channelsService.getUserChannels(user.id);
  }
}

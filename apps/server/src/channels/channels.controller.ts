import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Users } from 'src/users/entities/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChannelsService } from './channels.service';

import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GetChannelsDataResponse, GetChannelsResponse } from './dto/channels.dto';

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

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return channel data, messages and user', type: GetChannelsDataResponse })
  getChannelData(@Param('id') channelId: number): Promise<any> {
    return this.channelsService.getChannelData(channelId);
  }
}

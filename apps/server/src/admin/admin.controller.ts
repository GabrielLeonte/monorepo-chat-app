import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChannelsService } from 'src/channels/channels.service';
import { Channels } from 'src/channels/entities/channels.entity';

import { CreateChannelRequest } from './dto/channel.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post('createGlobalChannel')
  createGlobalChannel(@Body() { name }: CreateChannelRequest): Promise<Channels> {
    return this.channelsService.createGlobalChannel(name);
  }
}

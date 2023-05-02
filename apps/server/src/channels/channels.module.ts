import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';

import { Channels } from './entities/channels.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channels])],
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}

import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';

import { ChannelsModule } from 'src/channels/channels.module';

@Module({
  imports: [ChannelsModule],
  controllers: [AdminController],
})
export class AdminModule {}

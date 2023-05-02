import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';

import { Channels } from './entities/channels.entity';
import { MessagesModule } from 'src/messages/messages.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Channels]), MessagesModule, UsersModule],
  providers: [ChannelsService],
  controllers: [ChannelsController],
  exports: [ChannelsService],
})
export class ChannelsModule {}

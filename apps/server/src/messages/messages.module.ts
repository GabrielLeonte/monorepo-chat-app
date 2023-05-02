import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesService } from './messages.service';
import { Messages } from './entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}

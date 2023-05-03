import { Module } from '@nestjs/common';

import { WebsocketsGateway } from './websockets.gateway';

import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [MessagesModule],
  providers: [WebsocketsGateway],
})
export class WebsocketsModule {}

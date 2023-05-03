import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';

import { AuthGuard } from 'src/auth/auth.guard';

import { MessagesService } from 'src/messages/messages.service';
import { Users } from 'src/users/entities/users.entity';

type Request = Socket & { user: Users };

type SendMessagePayload = {
  channelId: number;
  content: string;
};

const { SOCKETS_PORT } = process.env;

@WebSocketGateway(parseInt(SOCKETS_PORT), { cors: true }) // cors will require a little bit more configuration on development/production environments
export class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() wss: Server;

  afterInit() {
    console.log('Socket.Io Initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client Connected: ${client.id}`);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('send_message')
  async handleSendMessage(request: Request, payload: SendMessagePayload): Promise<void> {
    const { user } = request;
    const { channelId, content } = payload;

    const messageObject = await this.messagesService.create({
      channelId,
      userId: user.id,
      content: content.trim(),
    });

    this.wss.emit(`messages_channel_${channelId}`, {
      id: messageObject.id,
      content: messageObject.content,
      createdAt: messageObject.createdAt,
      user: {
        username: user.username,
      },
    });

    const channelStatistics = await this.messagesService.getChannelStatistics(channelId);

    this.wss.emit(`channel_statistics_${channelId}`, channelStatistics);
  }
}

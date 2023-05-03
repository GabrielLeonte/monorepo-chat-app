import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';

import { AuthGuard } from 'src/auth/auth.guard';

import { MessagesService } from 'src/messages/messages.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Users } from 'src/users/entities/users.entity';

@WebSocketGateway(8080, { cors: true })
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
  async handleSendMessage(request: Socket & { user: Users }, payload: { channelId: string; message: string }): Promise<void> {
    const { user } = request;
    const { channelId, message } = payload;

    const messageObject = await this.messagesService.create({
      userId: user.id,
      channelId: parseInt(channelId),
      content: message.trim(),
    });

    this.wss.emit(`messages_channel_${channelId}`, {
      id: messageObject.id,
      content: messageObject.content,
      createdAt: messageObject.createdAt,
      user: {
        username: user.username,
      },
    });
  }
}

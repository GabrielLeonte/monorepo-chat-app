import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, { cors: true })
export class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    console.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected: ${client}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client Connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
    console.log(client, payload);
  }
}

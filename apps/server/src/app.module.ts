import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PasetoModule } from './paseto/paseto.module';
import { ChannelsModule } from './channels/channels.module';
import { AdminModule } from './admin/admin.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, PasetoModule, ChannelsModule, AdminModule, MessagesModule],
})
export class AppModule {}

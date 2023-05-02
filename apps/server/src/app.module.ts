import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PasetoModule } from './paseto/paseto.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, PasetoModule],
})
export class AppModule {}

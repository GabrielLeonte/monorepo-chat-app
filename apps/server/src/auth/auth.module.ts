import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from 'src/users/users.module';
import { PasetoModule } from 'src/paseto/paseto.module';

@Module({
  imports: [UsersModule, PasetoModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { Users } from './entities/users.entity';

import { PasetoModule } from 'src/paseto/paseto.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PasetoModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

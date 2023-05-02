import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from 'src/users/entities/users.entity';

const { DATABASE } = process.env;
const { HOST, PORT, USERNAME, PASSWORD, NAME } = JSON.parse(DATABASE);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: HOST,
      port: PORT,
      username: USERNAME,
      password: PASSWORD,
      database: NAME,
      entities: [Users],
      synchronize: true, // shouldn't be true in a production/development environment, but could work great for local as it speeds up development
    }),
  ],
})
export class DatabaseModule {}

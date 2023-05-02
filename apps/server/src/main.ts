/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const { SERVER_PORT } = process.env;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Chat App')
    .setDescription('Simple chat app using websockets')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(SERVER_PORT);

  console.log('Server running on', await app.getUrl());
};

bootstrap();

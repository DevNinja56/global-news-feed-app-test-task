import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  // Server General Configuration
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());

  // Middleware
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // get env
  const configService = app.get(ConfigService);
  const port = process.env.PORT || Number(configService.get('port')) || 3001;

  // Server listening
  await app.listen(port);
}

bootstrap();

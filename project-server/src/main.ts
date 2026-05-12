import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from '../config/enviroment';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });
  await app.listen(PORT ?? 3000);
}
void bootstrap();

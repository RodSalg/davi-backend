import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('DAVI: Denso Automatic Visual Inspection - API ')
  .setDescription('Server backend of DAVI')
  .setVersion('0.1')
  .build();

  await app.listen(3337);
}


bootstrap();


export const prisma = new PrismaClient();
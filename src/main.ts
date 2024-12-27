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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3337);
  console.log(`Aplicação rodando em: http://localhost:3337/api`);
}

bootstrap();

export const prisma = new PrismaClient();

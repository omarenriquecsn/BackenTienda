import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerModule } from './middlewares/logger.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerModule);

  const confitSwagger = new DocumentBuilder()
  .setTitle('E-commerce API')
  .setDescription('Documentacion de la API')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, confitSwagger)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe());


  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

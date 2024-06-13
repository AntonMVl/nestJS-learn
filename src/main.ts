import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); //Установление глобального префикса http://localhost:3000/api/profile
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

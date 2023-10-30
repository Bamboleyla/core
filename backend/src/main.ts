import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  //создаем приложение
  const app = await NestFactory.create(AppModule);
  //включаем валидацию
  app.useGlobalPipes(new ValidationPipe());
  //подключаем конфиг
  const config = await app.get(ConfigService);
  //запускаем приложение на адресе
  const port = config.get<number>('API_PORT');
  //Ждем запуск приложения
  await app.listen(port || 3000, () => {
    console.log(`App started on port: ${port}`);
  });
}

bootstrap();

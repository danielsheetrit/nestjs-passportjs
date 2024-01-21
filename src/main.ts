import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { VITE_DEV_HOST } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [VITE_DEV_HOST], // add the origin of your frontend endpoints
  });

  await app.listen(8000);
}
bootstrap();

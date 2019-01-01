import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { EntityNotFoundErrorFilter } from './shared/filters/exceptions/entity-not-found.filter';

import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalFilters(new EntityNotFoundErrorFilter());
  app.init();

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}  🚀 👌`, 'bootstrap()');
}
bootstrap();

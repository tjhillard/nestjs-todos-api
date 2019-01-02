import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { swaggerOptions } from '../config/swagger.config';
import { EntityNotFoundErrorFilter } from './shared/filters/exceptions/entity-not-found.filter';

import { AppModule } from './app.module';

const port = process.env.PORT || 3000;
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalFilters(new EntityNotFoundErrorFilter());

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api/v1/docs', app, document);

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}  🚀 👌`, 'bootstrap()');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

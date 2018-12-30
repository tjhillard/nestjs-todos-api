import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TodosModule],
})
export class AppModule {}

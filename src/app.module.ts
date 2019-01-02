import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from 'src/modules/users/user.entity';
import { TodoEntity } from './modules/todos/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: true,
      synchronize: true,
      entities: [
        UserEntity,
        TodoEntity,
      ],
    }),
    TodosModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

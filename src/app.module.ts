import 'dotenv/config';
import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';

import { UserEntity } from 'src/modules/users/user.entity';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TodoEntity } from './modules/todos/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: true,
      synchronize: process.env.NODE_ENV !== 'production',
      entities: [
        UserEntity,
        TodoEntity,
      ],
    }),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    TodosModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

import { TodosController } from '../todos.controller';
import { TodosService } from '../todos.service';
import { TodoEntity } from '../todo.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../users/user.entity';

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(() => {
    todosService = new TodosService(new Repository<TodoEntity>(), new Repository<UserEntity>());
    todosController = new TodosController(todosService);
  });
});

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudService } from 'src/shared/services/crud.service';

import { TodoEntity } from './todo.entity';

@Injectable()
export class TodosService extends CrudService {
  constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {
    super(todoRepository);
  }
}

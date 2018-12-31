import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoEntity } from './todo.entity';
import { CrudService } from '../shared/services/crud.service';

@Injectable()
export class TodosService extends CrudService {
  constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {
    super(todoRepository);
  }
}

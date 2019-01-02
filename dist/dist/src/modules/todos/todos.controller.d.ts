import { TodosService } from './todos.service';
import { TodoCreateDto, TodoUpdateDto, TodoResponseObject } from './todo.dto';
import { UserEntity } from '../users/user.entity';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    index(user: UserEntity): Promise<TodoResponseObject[]>;
    show(id: number, user: UserEntity): Promise<TodoResponseObject>;
    create(userId: number, data: TodoCreateDto): Promise<TodoResponseObject>;
    update(id: number, data: TodoUpdateDto, user: UserEntity): Promise<TodoResponseObject>;
    destroy(id: number, user: UserEntity): Promise<void>;
}

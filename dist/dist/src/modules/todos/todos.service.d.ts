import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { UserEntity } from '../users/user.entity';
export declare class TodosService {
    private readonly todoRepository;
    private readonly userRepository;
    constructor(todoRepository: Repository<TodoEntity>, userRepository: Repository<UserEntity>);
    private policy;
    getAll(user: UserEntity): Promise<any[]>;
    create(data: any, userId: number): Promise<any>;
    getOne(id: number, user: UserEntity): Promise<any>;
    update(id: number, data: any, user: UserEntity): Promise<any>;
    softDelete(id: number, user: UserEntity): Promise<null>;
    private getSerializedEntity;
}

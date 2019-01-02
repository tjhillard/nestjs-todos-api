import { UserEntity } from '../users/user.entity';
import { TodoResponseObject } from './todo.dto';
export declare class TodoEntity {
    id: number;
    description: string;
    completed: boolean;
    'created_at': Date;
    'updated_at': Date;
    deleted: boolean;
    user: UserEntity;
    serialize(): TodoResponseObject;
}

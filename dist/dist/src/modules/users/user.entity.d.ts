import 'dotenv/config';
import { UserResponseObject } from './user.dto';
import { TodoEntity } from '../todos/todo.entity';
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    role: number;
    'created_at': Date;
    'updated_at': Date;
    deleted: boolean;
    banned: boolean;
    todos: TodoEntity[];
    hashPassword(): Promise<void>;
    serialize(options?: any): UserResponseObject;
    comparePassword(given: string): Promise<boolean>;
    private readonly token;
}

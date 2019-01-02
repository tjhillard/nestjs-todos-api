import { UserEntity } from 'src/modules/users/user.entity';
export declare class BasePolicy {
    isSuperAdmin(user: Partial<UserEntity>): boolean;
    isAdmin(user: Partial<UserEntity>): boolean;
    isInternal(user: Partial<UserEntity>): boolean;
}

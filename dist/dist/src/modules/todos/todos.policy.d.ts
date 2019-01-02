import { UserResponseObject } from 'src/modules/users/user.dto';
import { BasePolicy } from 'src/shared/classes/base.policy';
import { UserEntity } from '../users/user.entity';
export declare class TodosPolicy extends BasePolicy {
    authorizeOwnership(user: UserEntity, resource: any): void;
    all(user?: UserResponseObject, response?: any): boolean;
}

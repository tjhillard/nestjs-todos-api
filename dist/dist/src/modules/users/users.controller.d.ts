import { UsersService } from './users.service';
import { UserResponseObject } from './user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<UserResponseObject[]>;
}

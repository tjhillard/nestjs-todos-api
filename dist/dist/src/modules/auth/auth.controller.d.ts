import { UserResponseObject } from 'src/modules/users/user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(data: AuthDto): Promise<UserResponseObject>;
    login(data: AuthDto): Promise<UserResponseObject>;
}

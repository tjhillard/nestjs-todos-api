import { Repository } from 'typeorm';
import { UserResponseObject } from 'src/modules/users/user.dto';
import { UserEntity } from 'src/modules/users/user.entity';
import { CrudService } from 'src/shared/services/crud.service';
import { AuthDto } from './auth.dto';
export declare class AuthService extends CrudService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    register(data: AuthDto): Promise<UserResponseObject>;
    login(data: AuthDto): Promise<UserResponseObject>;
}

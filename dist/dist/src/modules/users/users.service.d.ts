import { Repository } from 'typeorm';
import { CrudService } from 'src/shared/services/crud.service';
import { UserEntity } from './user.entity';
export declare class UsersService extends CrudService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
}

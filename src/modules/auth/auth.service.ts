import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserResponseObject } from 'src/modules/users/user.dto';
import { UserEntity } from 'src/modules/users/user.entity';
import { CrudService } from 'src/shared/services/crud.service';

import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService extends CrudService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { super(userRepository); }

  async register(data: AuthDto): Promise<UserResponseObject> {
    const { email } = data;
    let user: UserEntity = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User with provided email already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.create(data);
    return user.serialize({ includeToken: true });
  }

  async login(data: AuthDto): Promise<UserResponseObject> {
    const { email, password } = data;
    const user: UserEntity = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid email/password combination', HttpStatus.BAD_REQUEST);
    }
    return user.serialize({ includeToken: true });
  }
}

import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto, UserResponseObject } from 'src/modules/users/user.dto';
import { UserEntity } from 'src/modules/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(data: UserDto): Promise<UserResponseObject> {
    const { email } = data;
    let user: UserEntity = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User with provided email already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    return user.serialize({ includeToken: true });
  }

  async login(data: UserDto): Promise<UserResponseObject> {
    const { email, password } = data;
    const user: UserEntity = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid email/password combination', HttpStatus.BAD_REQUEST);
    }
    return user.serialize({ includeToken: true });
  }
}

import { Controller, Post, Body, UsePipes, Get } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDto, UserResponseObject } from './user.dto';
import { BaseValidationPipe } from 'src/shared/pipes/base-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @UsePipes(new BaseValidationPipe())
  async register(@Body() data: UserDto): Promise<UserResponseObject> {
    return await this.usersService.register(data);
  }

  @Post('login')
  @UsePipes(new BaseValidationPipe())
  async login(@Body() data: UserDto): Promise<UserResponseObject> {
    return await this.usersService.login(data);
  }

  @Get()
  async getAllUsers(): Promise<UserResponseObject[]> {
    return await this.usersService.getAll();
  }
}

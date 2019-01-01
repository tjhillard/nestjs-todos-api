import { Controller, Post, UsePipes, Body } from '@nestjs/common';

import { BaseValidationPipe } from 'src/shared/pipes/base-validation.pipe';
import { UserResponseObject, UserDto } from 'src/modules/users/user.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @UsePipes(new BaseValidationPipe())
  async register(@Body() data: UserDto): Promise<UserResponseObject> {
    return await this.authService.register(data);
  }

  @Post('login')
  @UsePipes(new BaseValidationPipe())
  async login(@Body() data: UserDto): Promise<UserResponseObject> {
    return await this.authService.login(data);
  }
}

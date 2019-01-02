import { Controller, Post, UsePipes, Body } from '@nestjs/common';

import { BaseValidationPipe } from 'src/shared/pipes/base-validation.pipe';
import { UserResponseObject } from 'src/modules/users/user.dto';

import { AuthService } from './auth.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

@Controller('auth')
@ApiUseTags('auth') @ApiBearerAuth()
@UsePipes(new BaseValidationPipe())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() data: AuthDto): Promise<UserResponseObject> {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: AuthDto): Promise<UserResponseObject> {
    return await this.authService.login(data);
  }
}

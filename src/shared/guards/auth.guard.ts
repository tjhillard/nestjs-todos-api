import 'dotenv/config';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { UserEntity } from 'src/modules/users/user.entity';
import { RolesService } from '../services/roles.service';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) { this.throwUnauthorized(); }
    const userJwtPayload: Partial<UserEntity> = await this.validateToken(request.headers.authorization);

    // Verify actual user attributes for all admin/internal user roles
    // This sacrifices performance but allows for immediate access revoking by:
    // - Setting user.disabled to TRUE
    // - Changing user.role to value other than what's signed in JWT payload
    if (RolesService.isInternalRole(userJwtPayload.role)) {
      const userRepository = getRepository(UserEntity);
      const user: UserEntity = await userRepository.findOne(userJwtPayload.id);

      if (user.role !== userJwtPayload.role) {
        this.throwUnauthorized('User role updated, please log out and back in');
      }
      if (user.disabled) {
        this.throwUnauthorized('User disabled');
      }
    }

    if (userJwtPayload.disabled) {
      this.throwUnauthorized('User disabled');
    }

    request.user = userJwtPayload;
    return true;
  }

  private async validateToken(authHeaderValue): Promise<any> {
    if (authHeaderValue.split(' ')[0] !== 'Bearer') {
      this.throwUnauthorized();
    }

    const token = authHeaderValue.split(' ')[1];
    try {
      return await verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const message = `${err.message || err.name}`;
      this.throwUnauthorized(message);
    }
  }

  private throwUnauthorized(message?: string): void {
    throw new HttpException(message || 'Unauthenticated', HttpStatus.UNAUTHORIZED);
  }
}

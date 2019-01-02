import 'dotenv/config';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) { this.throwUnauthorized(); }
    request.user = await this.validateToken(request.headers.authorization);

    if (request.user.deleted) { return false; }
    if (request.user.banned) { return false; }

    return true;
  }

  private async validateToken(authHeaderValue) {
    if (authHeaderValue.split( ' ')[0] !== 'Bearer') {
      return this.throwUnauthorized();
    }

    const token = authHeaderValue.split(' ')[1];
    try {
      return await verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const message = `JWT error: ${err.message || err.name}`;
      this.throwUnauthorized(message);
    }

    return true;
  }

  private throwUnauthorized(message?: string): void {
    throw new HttpException(message || 'Unauthenticated', HttpStatus.UNAUTHORIZED);
  }
}

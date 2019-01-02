import 'dotenv/config';
import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
    private validateToken;
    private throwUnauthorized;
}

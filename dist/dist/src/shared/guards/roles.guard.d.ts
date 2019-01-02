import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RolesGuard implements CanActivate {
    private policy;
    constructor(policy: any);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

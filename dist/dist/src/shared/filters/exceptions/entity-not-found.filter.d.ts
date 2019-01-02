import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
export declare class EntityNotFoundErrorFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost): any;
}

import { HttpStatus } from '@nestjs/common';
export declare class ErrorsService {
    static notFound(request: any): {
        statusCode: HttpStatus;
        message: string;
        path: any;
        method: any;
    };
}

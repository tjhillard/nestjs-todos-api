import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class BaseValidationPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private toValidate;
    private formatErrors;
}

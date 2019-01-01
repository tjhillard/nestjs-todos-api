// tslint:disable:max-classes-per-file
import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class TodoCreateDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class TodoUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class TodoResponseObject {
  description: string;
  completed: boolean;
  'created_at': Date;
  'updated_at': Date;
}

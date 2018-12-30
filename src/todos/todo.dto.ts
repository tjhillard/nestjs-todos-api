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

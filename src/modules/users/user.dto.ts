// tslint:disable:max-classes-per-file
import { IsEmail, Length } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @Length(6)
  password: string;
}

export class UserResponseObject {
  id: number;
  email: string;
  role: number;
  token?: string;
  'created_at': Date;
  'updated_at': Date;
}

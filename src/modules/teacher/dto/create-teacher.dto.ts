import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

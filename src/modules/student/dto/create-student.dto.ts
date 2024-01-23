import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

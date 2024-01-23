import { Exclude } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsEmail,
  IsInt,
} from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsNumber()
  @Exclude() // Exclude id from being updated
  id: number;

  @IsOptional()
  @IsString()
  @Exclude() // Exclude name from being updated
  name: string;

  @IsOptional()
  @IsEmail()
  @Exclude() // Exclude email from being updated
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsInt()
  level: number;

  @IsOptional()
  @IsInt()
  grade: number;
}

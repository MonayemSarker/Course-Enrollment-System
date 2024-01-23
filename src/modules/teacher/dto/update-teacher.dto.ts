// update-teacher.dto.ts
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsEmail } from 'class-validator';

export class UpdateTeacherDto {
  @IsOptional()
  @IsNumber()
  @Exclude() // Exclude id from being updated
  id: number;

  @IsOptional()
  @IsString()
  @Exclude() // Exclude name from being updated
  name: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  designation: string;

  @IsOptional()
  @IsString()
  specialization: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsEmail,
  IsInt,
} from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Exclude() // Exclude id from being updated
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Exclude() // Exclude name from being updated
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @Exclude() // Exclude email from being updated
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  level: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  grade: number;
}

// update-teacher.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateTeacherDto {
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
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  designation: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  specialization: string;
}

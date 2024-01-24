import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ApproveEnrollmentDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsBoolean()
  approved: boolean;

  @ApiProperty()
  @IsString()
  batch: string;
}

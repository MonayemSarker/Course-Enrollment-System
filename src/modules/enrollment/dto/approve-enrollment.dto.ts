import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ApproveEnrollmentDto {
  @IsNumber()
  id: number;
  @IsBoolean()
  approved: boolean;
  @IsString()
  batch: string;
}

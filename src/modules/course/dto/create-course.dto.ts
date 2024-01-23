import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  courseCode: number;

  @IsNotEmpty()
  @IsString()
  courseName: string;

  @IsNotEmpty()
  @IsString()
  courseDescription: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  credit: number;
}
